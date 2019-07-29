/// HTML include order for sim JS files:
/// datascript
/// util
/// engine
/// {actions,effects}
/// sim

window.Sim = (function(){

/// PREPROCESS ALL ACTIONS

let allActions = Object.values(actionLibrary);
allActions.forEach(preprocessAction);

/// GENERATION FUNCTIONS

function getAllCharacterNames(db) {
  return datascript.q('[:find ?n :where [?c "type" "char"] [?c "name" ?n]]', db).map(vars => vars[0]);
}

function getAllCharacterPairs(db) {
  return datascript.q('[:find ?c1 ?c2 \
                        :where [?c1 "type" "char"] [?c2 "type" "char"] [(not= ?c1 ?c2)]]', db);
}

let allNames = [
  'Aaron', 'Adam', 'Alex', 'Alice', 'Ann',
  'Bella', 'Ben', 'Beth',
  'Cam', 'Cathy', 'Colin',
  'Emily', 'Emma', 'Erin',
  'Fred',
  'Gavin', 'Gillian',
  'Izzy',
  'Jacob', 'James', 'Janey', 'Jason', 'Jordan',
  'Kevin', 'Kurt',
  'Liz',
  'Matt',
  'Nicole', 'Nora',
  'Quinn',
  'Robin',
  'Sarah',
  'Victor', 'Vincent'
];

function generateCharacter(db) {
  let takenNames = getAllCharacterNames(db);
  let validNames = allNames.filter((n) => takenNames.indexOf(n) === -1);
  return createEntity(db, {
    type: 'char',
    name: randNth(validNames),
    romanceTarget: 'nobody',
    romanceState: 'single'
  });
}

function generateAttitude(db) {
  let charPairs = getAllCharacterPairs(db);
  let charPair = randNth(charPairs);
  return createEntity(db, {
    type: 'attitude',
    charge: randNth(['positive', 'negative']),
    source: charPair[0],
    target: charPair[1]
  });
}

function generateAffection(db, char1, char2) {
  return createEntity(db, {
    level: 5,
    source: char1,
    target: char2,
    type: 'affection',
    realizedLove: false
  });
}

/// INIT DB

let schema = {
  //exampleAttr: {':db/cardinality': ':db.cardinality/many'},
  actor:  {':db/valueType': ':db.type/ref'},
  cause:  {':db/valueType': ':db.type/ref'},
  source: {':db/valueType': ':db.type/ref'},
  target: {':db/valueType': ':db.type/ref'}
};
let gameDB = datascript.empty_db(schema);

for (let i = 0; i < 10; i++){
  gameDB = generateCharacter(gameDB);
}
for (let i = 0; i < 20; i++){
  gameDB = generateAttitude(gameDB);
}
for (let charPair of getAllCharacterPairs(gameDB)) {
  gameDB = generateAffection(gameDB, charPair[0], charPair[1]);
}

/// TIE IT ALL TOGETHER

let simActionHandlers = [];

function handleSimAction(simAction) {
  for (let handler of simActionHandlers) {
    handler(simAction);
  }
}

// Commit an action with full bindings to the DB as an event, returing an updated DB.
function runActionWithBindings(db, action, bindings) {
  console.log('Running action of type: ' + action.type + '\nwith bindings: ' + JSON.stringify(bindings));
  let event = realizeEvent(action, bindings);
  console.log(event);
  db = addEvent(db, event);
  handleSimAction({action: action, bindings: bindings, event: event}); // FIXME impure, should be elsewhere
  return db;
}

// Given the DB and a list of action specs, pick a random possible action and perform it,
// returning an updated DB.
function runRandomAction(db, allActions){
  let allPossible = possibleActions(db, allActions);
  let possible = randNth(allPossible);
  return runActionWithBindings(db, possible.action, possible.bindings);
}

// Like `runRandomAction`, but assigns an equal selection weight to all valid action types.
function runRandomActionByType(db, allActions){
  let allPossibleByType = possibleActionsByType(db, allActions);
  let type = randNth(Object.keys(allPossibleByType));
  let possible = randNth(allPossibleByType[type]);
  return runActionWithBindings(db, possible.action, possible.bindings);
}

// Given the DB, an action, and a set of partial bindings for this action,
// find a valid variant of the action with the given partial bindings and perform it,
// returning an updated DB.
function runActionWithPartialBindings(db, action, partialBindings) {
  let boundLvars = Object.keys(partialBindings);
  let unboundLvars = action.lvars.filter(l => boundLvars.indexOf(l) === -1);
  let query = '[:find ' + unboundLvars.map(l => '?' + l).join(' ');
  query += ' :in $ ' + boundLvars.map(l => '?' + l).join(' ');
  query += ' ' + action.query.substring(action.query.indexOf(':where'));
  let results = datascript.q(query, db, ...Object.values(partialBindings));
  if (results.length < 1) {
    let err = Error('No realizable variant of action with partial bindings!');
    err.action = action;
    err.partialBindings = partialBindings;
    err.boundLvars = boundLvars;
    err.unboundLvars = unboundLvars;
    err.query = query;
    throw err;
  }
  let result = results[0];
  let bindings = Object.assign({}, partialBindings);
  for (let i = 0; i < unboundLvars.length; i++) {
    bindings[unboundLvars[i]] = result[i];
  }
  return runActionWithBindings(db, action, bindings);
}

/// return Sim singleton object

return {
  actionLibrary: actionLibrary,
  //schema: schema,
  getDB: function() {
    return gameDB;
  },
  runActionWithBindings: function(action, bindings) {
    gameDB = runActionWithBindings(gameDB, action, bindings);
  },
  runActionWithPartialBindings: function(action, partialBindings) {
    gameDB = runActionWithPartialBindings(gameDB, action, partialBindings);
  },
  runRandomActionByType: function() {
    gameDB = runRandomActionByType(gameDB, allActions);
  },
  registerActionHandler: function(handler) {
    simActionHandlers.push(handler);
  }
  //runSiftingPatterns: function() {}
}

})();