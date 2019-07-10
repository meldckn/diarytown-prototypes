/// ENGINE CODE

// Given an action spec, preprocess it.
function preprocessAction(action){
  var query = '[:find ' + action.find + ' :in $ % :where ';
  query += action.where.map(whereClause => '[' + whereClause + ']');
  query += ']';
  action.query = query;
  action.lvars = action.find.trim().split(/\s+/).map(s => s.substr(1));
  return action;
}

let effectHandlers = {};

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

effectHandlers['add_attitude'] = function(db, effect) {
  return createEntity(db, {
    type: 'attitude',
    cause: effect.cause,
    charge: effect.charge,
    source: effect.source,
    target: effect.target
  });
};

effectHandlers['start_project'] = function(db, effect) {
  return createEntity(db, {
    type: 'project',
    owner: effect.owner,
    projectType: effect.projectType,
    state: 'active',
    dramaLevel: 0
  });
};

effectHandlers['update_project_state'] = function(db, effect) {
  return updateProperty(db, effect.project, 'state', effect.newState);
};

effectHandlers['increase_project_drama'] = function(db, effect) {
  let oldDramaLevel = getEntity(db, effect.project).dramaLevel;
  let newDramaLevel = oldDramaLevel + (effect.amount || 1);
  return updateProperty(db, effect.project, 'dramaLevel', newDramaLevel);
};

effectHandlers['changeAffectionLevel'] = function(db, effect) {
  let oldAffectionLevel = getEntity(db, effect.affection).level;
  let newAffectionLevel = oldAffectionLevel + effect.amount;
  return updateProperty(db, effect.affection, 'level', newAffectionLevel);
};

effectHandlers['realizedLove'] = function(db, effect) {
  db = updateProperty(db, effect.affection, 'realizedLove', true);
  return updateProperty(db, effect.romeo, 'romanceTarget', effect.juliet);
};

effectHandlers['beginDating'] = function(db, effect) {
  db = updateProperty(db, effect.char1, 'relationshipState', "dating");
  return updateProperty(db, effect.char2, 'relationshipState', "dating");
};

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
  for (let effect of event.effects){
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
  event.type = action.type;
  return event;
}

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
    possibleByType[action.type] = [];
    for (let bindings of allBindings) {
      possibleByType[action.type].push({action: action, bindings: bindings});
    }
  }
  return possibleByType;
}
