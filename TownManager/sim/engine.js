/// PARSE SIFTING PATTERNS

function findLvars(s) {
  return s.match(/\?[a-zA-Z_][a-zA-Z0-9_]*/g).map(lvar => lvar.substring(1));
}

// Given part of a sifting pattern, return it, wrapping it in quotes if necessary.
function quotewrapIfNeeded(part) {
  if (part[0] === '?') return part;
  if (['true','false','nil'].indexOf(part) > -1) return part;
  if (!Number.isNaN(parseFloat(part))) return part;
  if (part.length >= 2 && part[0] === '"' && part[part.length - 1] === '"') return part;
  return '"' + part + '"';
}

function parseSiftingPatternClause(line) {
  line = line.trim();
  let lvars = distinct(findLvars(line));
  let parts = line.split(/\s+/);
  let clauseStr = line;
  if (line[0] === '(') {
    // handle complex clause
    // can be `(or ...)`, `(not ...)`, `(not-join ...)`, `(pred arg*)`, `(rule arg*)`, `(function arg*) result`
    if (['(or', '(not', '(not-join'].indexOf(parts[0]) > -1) {
      // don't export lvars from `or`, `not`, `not-join` clauses
      lvars = [];
    } else {
      // TODO also need to run this branch if the head of the clause is a rule name
      clauseStr = '[' + line + ']';
    }
  } else {
    // handle simple clause: `eid attr? value?`
    if (parts.length < 1 || parts.length > 3) {
      console.warn('Invalid query line: ' + line);
    }
    clauseStr = '[' + parts.map(quotewrapIfNeeded).join(' ') + ']';
  }
  return {clauseStr: clauseStr, lvars: lvars, original: line};
}

function parseSiftingPattern(lines) {
  let clauses = lines.map(parseSiftingPatternClause);
  let lvars = [];
  for (let clause of clauses) {
    lvars = lvars.concat(clause.lvars);
  }
  lvars = distinct(lvars);
  let findPart = lvars.map(lvar => '?' + lvar).join(' ');
  let wherePart = clauses.map(clause => clause.clauseStr).join();
  let query = '[:find ' + findPart + ' :where ' + wherePart + ']';
  return {lvars: lvars, clauses: clauses, query: query, findPart: findPart, wherePart: wherePart};
}

/// REGISTER SIFTING PATTERNS

let siftingPatternLibrary = {};

function registerSiftingPattern(name, patternLines) {
  if (siftingPatternLibrary[name]) {
    throw Error('A sifting pattern named ' + name + ' has already been registered!');
  }
  let pattern = parseSiftingPattern(patternLines);
  pattern.name = name;
  siftingPatternLibrary[name] = pattern;
}

/// REGISTER ACTIONS

let actionLibrary = {};

function registerAction(name, action) {
  if (actionLibrary[name]) {
    throw Error('An action named ' + name + ' has already been registered!');
  }
  actionLibrary[name] = action;
  action.name = name;
  action.lvars = [];
  if (!action.where) return; // don't need to do the rest for unconditional actions
  let pattern = parseSiftingPattern(action.where);
  action.pattern = pattern;
  action.wherePart = pattern.wherePart;
  if (action.find) {
    action.lvars = action.find.trim().split(/\s+/.map(s => s.substring(1)));
    action.query = '[:find ' + action.find + ' :where ' + pattern.wherePart + ']';
    action.findPart = action.find;
  } else {
    action.lvars = pattern.lvars;
    action.query = pattern.query;
    action.findPart = pattern.findPart;
  }
}

/// REGISTER EFFECT HANDLERS

let effectHandlers = {};

function registerEffectHandler(name, handler) {
  if (effectHandlers[name]) {
    throw Error('An effect handler named ' + name + ' has already been registered!');
  }
  effectHandlers[name] = handler;
}

/// COMMIT EVENTS TO DB

// Throw an error if `effect` doesn't contain exactly the keys in `desiredKeys`.
function checkEffectKeys(effect, desiredKeys) {
  desiredKeys = desiredKeys.concat(['type', 'cause']);
  let actualKeys = Object.keys(effect);
  let missingKeys = desiredKeys.filter(key => actualKeys.indexOf(key) === -1);
  let extraKeys = actualKeys.filter(key => desiredKeys.indexOf(key) === -1);
  if (missingKeys.length > 0 || extraKeys.length > 0) {
    let msg = 'Incorrect keys for ' + effect.type + ' effect\n' +
              '  Expected keys: ' + desiredKeys.join(', ') + '\n' +
              '  Actual keys: ' + actualKeys.join(', ');
    let err = Error(msg);
    err.effect = effect;
    err.desiredKeys = desiredKeys;
    err.actualKeys = actualKeys;
    err.missingKeys = missingKeys;
    err.extraKeys = extraKeys;
    throw err;
  }
}

// Given the DB and an effect, perform the effect and return an updated DB.
function processEffect(db, effect) {
  let handler = effectHandlers[effect.type];
  if (handler) {
    db = handler(db, effect);
  } else {
    console.error('Unrecognized effect type: ' + effect.type);
  }
  return db;
}

// Add an event to the DB, run all its effects, and return an updated DB.
function addEvent(db, event) {
  // add the actual event to the DB as an entity
  let eventEntity = {':db/id': -1};
  for (let prop of Object.keys(event)) {
    // add all properties of event (except effects and tags) to DB
    if (['effects', 'tags'].indexOf(prop) !== -1) continue;
    eventEntity[prop] = event[prop];
  }
  db = datascript.db_with(db, [eventEntity]);
  let eventID = newestEID(db);
  // process the event's effects
  for (let effect of event.effects || []){
    effect.cause = eventID;
    db = processEffect(db, effect);
  }
  // add the event's tags to the DB
  for (let tag of event.tags || []) {
    db = updateProperty(db, eventID, 'tag', tag);
  }
  return db;
}

// Given an action spec and a set of lvar bindings, return a concrete event object
// representing a performance of the specified action with the specified bindings.
function realizeEvent(action, bindings) {
  // make bound lvars accessible by name
  for (let i = 0; i < action.lvars.length; i++){
    bindings[action.lvars[i]] = bindings[i]; 
  }
  // build the event object
  let event = action.event(bindings);
  event.type = 'event';
  event.eventType = action.name;
  return event;
}

/// RETRIEVE POSSIBLE ACTIONS

// Given the DB and a list of action specs, return a list of "possible action" objects,
// each of which contains an action spec and a set of possible lvar bindings for that action.
function possibleActions(db, allActions) {
  let possible = [];
  for (let action of allActions) {
    if (action.query) {
      let allBindings = datascript.q(action.query, db);
      for (let bindings of allBindings){
        possible.push({action: action, bindings: bindings});
      }
    } else {
      possible.push({action: action, bindings: []});
    }
  }
  return possible;
}

// Same as possibleActions, but returns an object grouping the "possible action" objects
// by action type.
function possibleActionsByType(db, allActions) {
  let possibleByType = {};
  for (let action of allActions) {
    if (action.query) {
      let allBindings = datascript.q(action.query, db);
      if (allBindings.length === 0) continue; // skip actions for which there's no valid bindings
      possibleByType[action.name] = [];
      for (let bindings of allBindings) {
        possibleByType[action.name].push({action: action, bindings: bindings});
      }
    } else {
      possibleByType[action.name] = [{action: action, bindings: []}];
    }
  }
  return possibleByType;
}
