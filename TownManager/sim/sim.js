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

// Given the DB and a list of action specs, pick a random possible action and perform it,
// returning an updated DB.
function runRandomAction(db, allActions){
  let allPossible = possibleActions(db, allActions);
  let possible = randNth(allPossible);
  let event = realizeEvent(possible.action, possible.bindings);
  db = addEvent(db, event);
  console.log(event);
  log.innerText = event.text + '\n' + log.innerText;
  return db;
}

// Like `runRandomAction`, but assigns an equal selection weight to all valid action types.
function runRandomActionByType(db, allActions){
  let allPossibleByType = possibleActionsByType(db, allActions);
  let type = randNth(Object.keys(allPossibleByType));
  let possible = randNth(allPossibleByType[type]);
  console.log(type);
  let event = realizeEvent(possible.action, possible.bindings);
  db = addEvent(db, event);
  console.log(event);
  log.innerText = event.text + '\n' + log.innerText;
  return db;
}

/// return Sim singleton object

return {
  actionLibrary: actionLibrary,
  //schema: schema,
  getDB: function() {
    return gameDB;
  },
  runActionWithBindings: function(actionWithBindings) {
    let event = realizeEvent(actionWithBindings.action, actionWithBindings.bindings);
    gameDB = addEvent(gameDB, event);
  },
  runRandomActionByType: function() {
    gameDB = runRandomActionByType(gameDB, allActions);
  }
  //runSiftingPatterns: function() {}
}

})();