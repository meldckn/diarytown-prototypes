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

// Given the DB and a list of action specs, return a random possible action with bindings.
function getRandomAction(db, allActions){
  let allPossible = possibleActions(db, allActions);
  return randNth(allPossible);
}

// Like `runRandomAction`, but assigns an equal selection weight to all valid action types.
function getRandomActionByType(db, allActions){
  let allPossibleByType = possibleActionsByType(db, allActions);
  let type = randNth(Object.keys(allPossibleByType));
  return randNth(allPossibleByType[type]);
}

// Given the DB, an action, and a set of partial bindings for this action,
// return a full set of compatible bindings for the action.
function getFullBindings(db, action, partialBindings) {
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
  return bindings;
}

/// set up handler infrastructure

let simActionHandlers = [];

function handleSimAction(simAction) {
  for (let handler of simActionHandlers) {
    handler(simAction);
  }
}

/// return Sim singleton object

return {
  actionLibrary: actionLibrary,
  //schema: schema,
  getDB: function() {
    return gameDB;
  },
  // Perform the specified action with the specified bindings.
  runActionWithBindings: function(action, bindings) {
    console.log('Running action of type: ' + action.type + '\nwith bindings: ' + JSON.stringify(bindings));
    let event = realizeEvent(action, bindings);
    console.log(event);
    gameDB = addEvent(gameDB, event);
    handleSimAction({action: action, bindings: bindings, event: event});
  },
  // Perform a variant of the specified action with the specified partial bindings.
  runActionWithPartialBindings: function(action, partialBindings) {
    let bindings = getFullBindings(gameDB, action, partialBindings);
    this.runActionWithBindings(action, bindings);
  },
  // Perform a random possible action.
  runRandomAction: function() {
    let possible = getRandomActionByType(gameDB, allActions);
    this.runActionWithBindings(possible.action, possible.bindings);
  },
  // Register an action handler function to be called whenever a simulation action is performed.
  // The action handler will receive a single argument: an object with properties {action, bindings, event}.
  registerActionHandler: function(handler) {
    simActionHandlers.push(handler);
  }
  //runSiftingPatterns: function() {}
}

})();