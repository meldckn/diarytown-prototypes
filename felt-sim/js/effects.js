effectHandlers.addAttitude = function(db, effect) {
  return createEntity(db, {
    type: 'attitude',
    cause: effect.cause,
    charge: effect.charge,
    source: effect.source,
    target: effect.target
  });
};

effectHandlers.startProject = function(db, effect) {
  return createEntity(db, {
    type: 'project',
    owner: effect.owner,
    projectType: effect.projectType,
    state: 'active',
    dramaLevel: 0
  });
};

effectHandlers.updateProjectState = function(db, effect) {
  return updateProperty(db, effect.project, 'state', effect.newState);
};

effectHandlers.increaseProjectDrama = function(db, effect) {
  let oldDramaLevel = getEntity(db, effect.project).dramaLevel;
  let newDramaLevel = oldDramaLevel + (effect.amount || 1);
  return updateProperty(db, effect.project, 'dramaLevel', newDramaLevel);
};

effectHandlers.changeAffectionLevel = function(db, effect) {
  let oldAffectionLevel = getEntity(db, effect.affection).level;
  let newAffectionLevel = oldAffectionLevel + effect.amount;
  return updateProperty(db, effect.affection, 'level', newAffectionLevel);
};

effectHandlers.realizeLove = function(db, effect) {
  db = updateProperty(db, effect.affection, 'realizedLove', true);
  return updateProperty(db, effect.romeo, 'romanceTarget', effect.juliet);
};

effectHandlers.beginDating = function(db, effect) {
  db = updateProperty(db, effect.char1, 'romanceState', 'dating');
  return updateProperty(db, effect.char2, 'romanceState', "dating");
};
