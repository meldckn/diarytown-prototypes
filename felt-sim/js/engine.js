/// ENGINE CODE

// Given an action spec, preprocess it.
function preprocessAction(action){
  var query = '[:find ' + action.find + ' :where ';
  query += action.where.map(whereClause => '[' + whereClause + ']');
  query += ']';
  action.query = query;
  action.lvars = action.find.trim().split(/\s+/).map(s => s.substr(1));
  return action;
}

// Given the DB and an effect, perform the effect and return an updated DB.
function processEffect(db, effect){
  if (effect.type === 'add_attitude'){
    db = datascript.db_with(db, [{
      ':db/id': -1,
      type: 'attitude',
      cause: effect.cause,
      charge: effect.charge,
      source: effect.source,
      target: effect.target
    }]);
  }
  else if (effect.type === 'start_project'){
    db = datascript.db_with(db, [{
      ':db/id': -1,
      type: 'project',
      owner: effect.owner,
      projectType: effect.projectType,
      state: 'active',
      dramaLevel: 0
    }]);
  }
  else if (effect.type === 'update_project_state'){
    db = datascript.db_with(db, [[':db/add', effect.project, 'state', effect.newState]]);
  }
  else if (effect.type === 'increase_project_drama'){
    let oldDramaLevel = datascript.q('[:find ?d . :where [' + effect.project + ' "dramaLevel" ?d]]', db);
    let newDramaLevel = oldDramaLevel + (effect.amount || 1);
    db = datascript.db_with(db, [[':db/add', effect.project, 'dramaLevel', newDramaLevel]]);
  }
  /*
  else if (effect.type === 'create_entity'){
    // TODO assert effect.entity is an object
    let entity = {':db/id': -1};
    for (let prop of Object.keys(effect.entity)){
      entity[prop] = effect.entity[prop];
    }
    db = datascript.db_with(db, [entity]);
  }
  else if (effect.type === 'update_props'){
    // TODO assert effect.eid is a valid EID, effect.props is an object
    for (let prop of Object.keys(effect.props)){
      db = datascript.db_with(db, [[':db/add', effect.eid, prop, effect.props[prop]]]);
    }
  }
  else if (effect.type === 'update_prop'){
    // TODO assert effect.eid is a valid EID, effect.prop is a string, effect.val is a value
    db = datascript.db_with(db, [[':db/add', effect.eid, effect.prop, effect.val]]);
  }
  */
  else {
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
