/// PARSE SIFTING PATTERNS

function findLvars(s) {
  return s.match(/\?[a-zA-Z_][a-zA-Z0-9_]*/g).map(lvar => lvar.substring(1));
}

function parseSiftingPatternClause(line) {
  line = line.trim();
  let lvars = findLvars(line);
  let parts = line.split(/\s+/);
  let clauseStr = line;
  if (['(or', '(not', '(not-join'].indexOf(parts[0]) === -1) { // TODO also check if it's a rule name
    clauseStr = '[' + clauseStr + ']';
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
  action.name = name;
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
  actionLibrary[name] = action;
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

// Given the DB and an effect, perform the effect and return an updated DB.
function processEffect(db, effect){
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
    // add all properties of event (except effects) to DB
    if (['effects'].indexOf(prop) !== -1) continue;
    eventEntity[prop] = event[prop];
  }
  db = datascript.db_with(db, [eventEntity]);
  let eventID = newestEID(db);
  // process the event's effects
  for (let effect of event.effects || []){
    effect.cause = eventID;
    db = processEffect(db, effect);
  }
  return db;
}

// Given an action spec and a set of lvar bindings, return a concrete event object
// representing a performance of the specified action with the specified bindings.
function realizeEvent(action, bindings){
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
function possibleActions(db, allActions){
  let possible = [];
  for (let action of allActions) {
    let allBindings = datascript.q(action.query, db);
    for (let bindings of allBindings){
      possible.push({action: action, bindings: bindings});
    }
  }
  return possible;
}

// Same as possibleActions, but returns an object grouping the "possible action" objects
// by action type.
function possibleActionsByType(db, allActions){
  let possibleByType = {};
  for (let action of allActions) {
    let allBindings = datascript.q(action.query, db);
    if (allBindings.length === 0) continue; // skip actions for which there's no valid bindings
    possibleByType[action.name] = [];
    for (let bindings of allBindings) {
      possibleByType[action.name].push({action: action, bindings: bindings});
    }
  }
  return possibleByType;
}
