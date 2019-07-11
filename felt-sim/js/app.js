/// USER QUERY HANDLING

function isValidLiteral(s) {
  return (['true','false','nil'].indexOf(s) > -1) ||
         (!Number.isNaN(parseFloat(s))) ||
         (s.length >= 2 && s[0] === '"' && s[s.length - 1] === '"');
}

function parseUserQueryLine(line) {
  let clauseType = null;
  let lvars = [];
  let parts = line.split(/\s+/g);
  let clause = '';
  if (line[0] === '(') {
    // handle complex clause: `(or [eid property value]+)` or `(rule arg+)` or `(function arg+) result-lvar`
    clauseType = 'complex';
    clause = line;
    for (let part of parts) {
      // strip leading open-{parens,square-brackets} and trailing close-{parens,square-brackets}
      let partWithoutParens = part.replace(/^[\(\[]/, '').replace(/[\)\]]$/, '');
      if (partWithoutParens[0] === '?') {
        lvars.push(partWithoutParens);
      }
    }
  } else {
    // handle simple clause: `eid property value`
    clauseType = 'simple';
    if (parts.length !== 3) {
      console.error('invalid user query line: ' + line);
      return;
    }
    for (let part of parts) {
      if (part[0] === '?') {
        lvars.push(part);
      } else if (!isValidLiteral(part)) {
        // wrap in quotes if not already wrapped (and not a literal number, boolean, or nil)
        part = '"' + part + '"';
      }
      clause += part + ' ';
    }
  }
  if (parts[0] !== '(or') {
    clause = '[' + clause + ']';
  }
  return {clauseType: clauseType, clause: clause, lvars: lvars, original: line};
}

function parseUserQuery(userQuery) {
  let lines = userQuery.split('\n');
  lines = lines.map(l => l.trim());
  lines = lines.filter(l => l.length > 0);
  let clauses = lines.map(parseUserQueryLine);

  let lvars = [];
  for (let clause of clauses) {
    lvars = lvars.concat(clause.lvars);
  }
  lvars = distinct(lvars);

  let finalQuery = '[:find ' + lvars.join(' ');
  finalQuery += ' :where ';
  finalQuery += clauses.map(c => c.clause).join();
  finalQuery += ']';

  return {query: finalQuery, clauses: clauses, lvars: lvars, original: userQuery};
}

function runUserQuery() {
  let query = parseUserQuery(queryInput.value);
  let results = datascript.q(query.query, gameDB).sort((a, b) => a[0] - b[0]);

  // remove all rows from table
  for (let i = queryResults.rows.length - 1; i >= 0; i--) {
    queryResults.deleteRow(i);
  }

  // add header row with all lvars
  let headerRow = queryResults.insertRow();
  for (let lvar of query.lvars) {
    let cell = headerRow.insertCell();
    cell.innerText = lvar.replace(/^\?/, '');
  }

  // add a row for each query result
  for (let result of results) {
    let row = queryResults.insertRow();
    for (let i = 0; i < query.lvars.length; i++) {
      let cell = row.insertCell();
      cell.innerText = result[i];
    }
  }
}

queryButton.onclick = runUserQuery;
queryInput.onchange = runUserQuery;
queryInput.onkeydown = function(event) {
  if (event.key === 'Enter') {
    runUserQuery();
  }
};

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
  console.log(type);
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
