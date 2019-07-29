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

function retrieveAction(actionOrName) {
  if (typeof actionOrName === 'string') {
    let action = actionLibrary[actionOrName];
    if (!action) throw Error('No action with name: ' + actionOrName);
    return action;
  } else if (typeof actionOrName === 'object') {
    return actionOrName;
  } else {
    let err = Error('Not an action or action name!');
    err.actionOrName = actionOrName;
    throw err;
  }
}

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
    // TODO this is maybe the point at which we have to synthetically induce state changes
    // that force the other preconds to be true?
    console.warn('No valid variant of action with partial bindings!', {
      action: action,
      partialBindings: partialBindings,
      boundLvars: boundLvars,
      unboundLvars: unboundLvars,
      query: query
    });
  }
  let result = results[0] || [];
  let bindings = Object.assign({}, partialBindings);
  for (let i = 0; i < unboundLvars.length; i++) {
    bindings[unboundLvars[i]] = result[i];
  }
  return bindings;
}

/// set up handler infrastructure

let simEventHandlers = [];

function handleSimEvent(simEvent) {
  for (let handler of simEventHandlers) {
    handler(simEvent);
  }
}

/// set up sifting pattern infrastructure

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
  let allLvars = [];
  for (let clause of clauses) {
    allLvars = allLvars.concat(clause.lvars);
  }
  let findPart = allLvars.map(lvar => '?' + lvar).join(' ');
  let wherePart = clauses.map(clause => clause.clauseStr).join();
  let query = '[:find ' + findPart + ' :where ' + wherePart + ']';
  return {lvars: allLvars, clauses: clauses, query: query, findPart: findPart, wherePart: wherePart};
}

let siftingPatternLibrary = {};

function registerSiftingPattern(name, patternLines) {
  if (siftingPatternLibrary[name]) {
    throw Error('A sifting pattern with name ' + name + ' has already been registered!');
  }
  let pattern = parseSiftingPattern(patternLines);
  pattern.name = name;
  siftingPatternLibrary[name] = pattern;
}

let nuggetsAlreadyFound = [];

function runSiftingPatterns() {
  let allNuggets = [];
  for (let pattern of Object.values(siftingPatternLibrary)) {
    let results = datascript.q(pattern.query, gameDB);
    for (let result of results) {
      let nuggetStr = pattern.name + '|' + result.join('|');
      if (nuggetsAlreadyFound.indexOf(nuggetStr) > -1) continue;
      let vars = {};
      for (let i = 0; i < pattern.lvars.length; i++) {
        vars[pattern.lvars[i]] = result[i];
      }
      allNuggets.push({pattern: pattern, vars: vars});
      nuggetsAlreadyFound.push(nuggetStr);
    }
  }
  return allNuggets;
}

/// return Sim singleton object

return {
  // Return the current simulation state as a DataScript DB.
  getDB: function() {
    return gameDB;
  },
  // Set the player character's name within the simulation.
  setPlayerName: function(playerName) {
    gameDB = updateProperty(gameDB, 1, 'name', playerName);
  },
  // Perform a player-entered diary action.
  runDiaryAction: function(actionName, actionText) {
    console.log('Running diary action of type: ' + actionName);
    let event = {type: 'event', isDiaryEvent: true, eventType: actionName, text: actionText, actor: 1, target: 1};
    console.log(event);
    gameDB = addEvent(gameDB, event);
    handleSimEvent(event);
  },
  // Perform the specified action with the specified bindings.
  runActionWithBindings: function(action, bindings) {
    console.log('Running action of type: ' + action.type + '\nwith bindings: ' + JSON.stringify(bindings));
    let event = realizeEvent(action, bindings);
    console.log(event);
    gameDB = addEvent(gameDB, event);
    handleSimEvent(event);
  },
  /*
  // Perform a variant of the specified action with the specified partial bindings.
  // We were originally going to use this to run diary actions as Felt actions,
  // but for now, we're going to treat diary actions as a separate kind of thing.
  runActionWithPartialBindings: function(action, partialBindings) {
    let bindings = getFullBindings(gameDB, action, partialBindings);
    this.runActionWithBindings(action, bindings);
  },
  */
  // Perform a random possible action.
  runRandomAction: function() {
    let possible = getRandomActionByType(gameDB, allActions);
    this.runActionWithBindings(possible.action, possible.bindings);
  },
  // Register an event handler function to be called whenever a simulation event takes place.
  // The event handler will receive the event that was just performed as an argument.
  registerEventHandler: function(handler) {
    simEventHandlers.push(handler);
  },
  // Register a new sifting pattern.
  registerSiftingPattern: registerSiftingPattern,
  // Run all registered sifting patterns over the database. Return all new nuggets that are found.
  runSiftingPatterns: runSiftingPatterns
}

})();

/*
/// EXAMPLE USAGE (in a separate file)

// To make a new diary entry...
Sim.runDiaryAction('seeCuteAnimal', 'Today I saw a cute animal.');

// To register a new sifting pattern...
Sim.registerSiftingPattern('sawThreeAnimals', [
  '?e1 "eventType" "seeCuteAnimal"',
  '?e2 "eventType" "seeCuteAnimal"',
  '?e3 "eventType" "seeCuteAnimal"',
  '(< ?e1 ?e2 ?e3)',
  '?e1 "actor" ?c1',
  '?e2 "actor" ?c1',
  '?e3 "actor" ?c1',
  '?c1 "name" ?n1'
]);

// To write a function that'll be called whenever a new event happens...
Sim.registerEventHandler(function(event) {
  // Use this information to do animations, etc.
  // For instance, use the value of event.actor to find the corresponding character sprite
  // and put an appropriate emoji over their head.
  // Can check event.isDiaryEvent to determine whether this event was player-entered or autonomous.

  // To perform story sifting every time a new event takes place...
  let newNuggets = Sim.runSiftingPatterns();
  // Now you can do stuff with newNuggets, e.g. adding decorative buildings to the town
  // based on the story pattern that was just recognized.
  // For instance, to check if the first nugget is an instance of the "sawThreeAnimals" pattern...
  if (nuggets[0] && nuggets[0].pattern.name === 'sawThreeAnimals') {
    // ...your code here...
  }
});

// To make the simulation run actions autonomously...
window.setInterval(function(){
  Sim.runRandomAction();
}, 1000 * 10); // one action every 10 seconds
*/
