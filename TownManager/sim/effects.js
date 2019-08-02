registerEffectHandler('addAttitude', function(db, effect) {
  checkEffectKeys(effect, ['cause', 'charge', 'source', 'target']);
  return createEntity(db, {
    type: 'attitude',
    cause: effect.cause,
    charge: effect.charge,
    source: effect.source,
    target: effect.target
  });
});

registerEffectHandler('startProject', function(db, effect) {
  checkEffectKeys(effect, ['owner', 'projectType']);
  return createEntity(db, {
    type: 'project',
    owner: effect.owner,
    projectType: effect.projectType,
    state: 'active',
    dramaLevel: 0
  });
});

registerEffectHandler('updateProjectState', function(db, effect) {
  checkEffectKeys(effect, ['project', 'newState']);
  return updateProperty(db, effect.project, 'state', effect.newState);
});

registerEffectHandler('increaseProjectDrama', function(db, effect) {
  checkEffectKeys(effect, ['project', 'amount']);
  let oldDramaLevel = getEntity(db, effect.project).dramaLevel;
  let newDramaLevel = oldDramaLevel + (effect.amount || 1);
  return updateProperty(db, effect.project, 'dramaLevel', newDramaLevel);
});

registerEffectHandler('changeAffectionLevel', function(db, effect) {
  checkEffectKeys(effect, ['affection', 'amount']);
  let oldAffectionLevel = getEntity(db, effect.affection).level;
  let newAffectionLevel = oldAffectionLevel + effect.amount;
  return updateProperty(db, effect.affection, 'level', newAffectionLevel);
});

registerEffectHandler('realizeLove', function(db, effect) {
  checkEffectKeys(effect, ['affection', 'romeo', 'juliet']);
  db = updateProperty(db, effect.affection, 'realizedLove', true);
  return updateProperty(db, effect.romeo, 'romanceTarget', effect.juliet);
});

registerEffectHandler('beginDating', function(db, effect) {
  checkEffectKeys(effect, ['char1', 'char2']);
  db = updateProperty(db, effect.char1, 'romanceState', 'dating');
  return updateProperty(db, effect.char2, 'romanceState', 'dating');
});

registerEffectHandler('propose', function(db, effect) {
  checkEffectKeys(effect, ['char1', 'char2']);
  db = updateProperty(db, effect.char1, 'romanceState', 'engaged');
  return updateProperty(db, effect.char2, 'romanceState', 'engaged');
});

registerEffectHandler('marry', function(db, effect) {
  checkEffectKeys(effect, ['char1', 'char2']);
  db = updateProperty(db, effect.char1, 'romanceState', 'married');
  return updateProperty(db, effect.char2, 'romanceState', 'married');
});

registerEffectHandler('haveKids', function(db, effect) {
  checkEffectKeys(effect, ['char1', 'char2']);
  db = updateProperty(db, effect.char1, 'romanceState', 'haveKids');
  return updateProperty(db, effect.char2, 'romanceState', 'haveKids');
});

registerEffectHandler('breakUp', function(db, effect) {
  checkEffectKeys(effect, ['char1', 'char2']);
  db = updateProperty(db, effect.char1, 'romanceState', 'single');
  return updateProperty(db, effect.char2, 'romanceState', 'single');
});

registerEffectHandler('divorce', function(db, effect) {
  checkEffectKeys(effect, ['char1', 'char2']);
  db = updateProperty(db, effect.char1, 'romanceState', 'single');
  return updateProperty(db, effect.char2, 'romanceState', 'single');
});

registerEffectHandler('changeAttitudeTowardSelf', function(db, effect) {
  checkEffectKeys(effect, ['target', 'amount']);
  let oldAttitude = getEntity(db, effect.target).attitudeTowardSelf || 0;
  let newAttitude = oldAttitude + effect.amount;
  return updateProperty(db, effect.target, 'attitudeTowardSelf', newAttitude);
});

registerEffectHandler('changePopularity', function(db, effect){
  checkEffectKeys(effect, ['target', 'amount']);
  let oldPopularity = getEntity(db, effect.target).popularity || 0;
  let newPopularity = oldPopularity + effect.amount;
  return updateProperty (db, effect.target, 'popularity' , newPopularity);
});
