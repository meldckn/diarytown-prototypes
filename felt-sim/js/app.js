/// GENERATION FUNCTIONS

function getAllCharacterNames(db) {
  return datascript.q('[:find ?n :where [?c "type" "char"] [?c "name" ?n]]', db).map(vars => vars[0]);
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

function generateCharacter(db){
  let takenNames = getAllCharacterNames(db);
  let validNames = allNames.filter((n) => takenNames.indexOf(n) === -1);
  return datascript.db_with(db, [{
    ':db/id': -1,
    type: 'char',
    name: randNth(validNames)
  }]);
}

function generateAttitude(db){
  let charPairs = datascript.q('[:find ?c1 ?c2 \
                                 :where [?c1 "type" "char"] [?c2 "type" "char"] [(not= ?c1 ?c2)]]', db);
  let charPair = randNth(charPairs);
  return datascript.db_with(db, [{
    ':db/id': -1,
    type: 'attitude',
    charge: randNth(['positive', 'negative']),
    source: charPair[0],
    target: charPair[1]
  }]);
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

console.log(getAllCharacterNames(gameDB));

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
  let event = realizeEvent(possible.action, possible.bindings);
  db = addEvent(db, event);
  console.log(event);
  log.innerText = event.text + '\n' + log.innerText;
  return db;
}

let runLoopID = null;

function pauseSim(){
  window.clearInterval(runLoopID);
  runLoopID = null;
  playPauseButton.innerText = 'Resume simulation';
  playPauseButton.onclick = playSim;
}

function playSim(){
  runLoopID = window.setInterval(function(){
    gameDB = runRandomActionByType(gameDB, allActions);
  }, 1000);
  playPauseButton.innerText = 'Pause simulation';
  playPauseButton.onclick = pauseSim;
}

playSim();
