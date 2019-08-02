/// ACTION DEFINITIONS

registerAction('betray', {
  where: [
    '?dislike "type" "attitude"',
    '?dislike "charge" "negative"',
    '?dislike "source" ?c1',
    '?dislike "target" ?c2',
    '?c1 "name" ?n1',
    '?c2 "name" ?n2',
    '(not= ?c1 ?c2)' // in case we want to permit self-dislike but not self-betrayal :(
  ],
  event: (vars) => ({
    actor: vars.c1,
    target: vars.c2,
    effects: [
      {type: 'addAttitude', charge: 'negative', source: vars.c2, target: vars.c1}
    ],
    text: "🔪 Out of nowhere, " + vars.n2 + " betrayed " + vars.n1 + "!"
  })
});

registerAction('hangOutWith', {
  where: [
    '?c1 "name" ?n1',
    '?c2 "name" ?n2',
    '(not= ?c1 ?c2)',
    '?a1 "type" "affection"',
    '?a1 "source" ?c1',
    '?a1 "target" ?c2',
    '?a2 "type" "affection"',
    '?a2 "source" ?c2',
    '?a2 "target" ?c1'
  ],
  event: (vars) => ({
    actor: vars.c1,
    target: vars.c2,
    effects: [
      {type: 'addAttitude', charge: 'positive', source: vars.c2, target: vars.c1},
      {type: 'addAttitude', charge: 'positive', source: vars.c1, target: vars.c2},
      {type: 'changeAffectionLevel', affection:vars.a1, amount:1},
      {type: 'changeAffectionLevel', affection:vars.a2, amount:1}
    ],
    text: "🍦 " + vars.n1 + " and " + vars.n2 +
          " hung out together at the " + randNth(['boba','ice cream','pizza']) + " place."
  })
});

registerAction('seeCuteAnimal', {
  where: [
    '?c1 "name" ?n1'
  ],
  event: (vars) => ({
    actor: vars.c1,
    text: "🐶 " + vars.n1 + " saw a cute " + randNth(['dog','cat','snake']) + "."
  })
});

let allProjectTypes = ['art','craft','poetry','programming','research','writing'];

registerAction('startProject', {
  where: [
    '?c1 "name" ?n1'
  ],
  event: function(vars){
    let projectType = randNth(allProjectTypes);
    return {
      actor: vars.c1,
      // TODO need to specify project: somehow, but can't, because its ID is only generated
      // once the effects are run
      effects: [
        {type: 'startProject', owner: vars.c1, projectType: projectType}
      ],
      text: "🎨 " + vars.n1 + " started a new " + projectType + " project!",
      tags: ['projects']
    };
  }
});

registerAction('makeProgressOnProject', {
  where: [
    '?c1 "name" ?n1',
    '?proj "owner" ?c1',
    '?proj "projectType" ?projtype',
    '?proj "state" "active"'
  ],
  event: (vars) => ({
    actor: vars.c1,
    project: vars.proj,
    effects: [
      {type: 'increaseProjectDrama', project: vars.proj, amount: 1}
    ],
    text: "🎨 " + vars.n1 + " made a lot of progress on their " + vars.projtype + " project.",
    tags: ['projects']
  })
});

registerAction('workFruitlesslyOnProject', {
  where: [
    '?c1 "name" ?n1',
    '?proj "owner" ?c1',
    '?proj "projectType" ?projtype',
    '?proj "state" "active"'
  ],
  event: (vars) => ({
    actor: vars.c1,
    project: vars.proj,
    effects: [
      {type: 'increaseProjectDrama', project: vars.proj, amount: 1}
    ],
    text: "🎨 " + vars.n1 + " tried to work on their " + vars.projtype + " project, but got nowhere.",
    tags: ['projects']
  })
});

registerAction('abandonProject', {
  where: [
    '?c1 "name" ?n1',
    '?proj "owner" ?c1',
    '?proj "projectType" ?projtype',
    '?proj "state" "active"'
  ],
  event: (vars) => ({
    actor: vars.c1,
    project: vars.proj,
    effects: [
      {type: 'updateProjectState', project: vars.proj, newState: 'inactive'},
      {type: 'increaseProjectDrama', project: vars.proj, amount: 2}
    ],
    text: "🎨 " + vars.n1 + " gave up on their " + vars.projtype + " project.",
    tags: ['projects']
  })
});

registerAction('resumeProject', {
  where: [
    '?c1 "name" ?n1',
    '?proj "owner" ?c1',
    '?proj "projectType" ?projtype',
    '?proj "state" "inactive"'
  ],
  event: (vars) => ({
    actor: vars.c1,
    project: vars.proj,
    effects: [
      {type: 'updateProjectState', project: vars.proj, newState: 'active'},
      {type: 'increaseProjectDrama', project: vars.proj, amount: 2}
    ],
    text: "🎨 " + vars.n1 + " started working on their " + vars.projtype + " project again!",
    tags: ['projects']
  })
});

registerAction('finishProject', {
  where: [
    '?c1 "name" ?n1',
    '?proj "owner" ?c1',
    '?proj "projectType" ?projtype',
    '?proj "state" "active"',
    '?proj "dramaLevel" ?d',
    '(>= ?d 5)'
  ],
  event: (vars) => ({
    actor: vars.c1,
    project: vars.proj,
    effects: [
      {type: 'updateProjectState', project: vars.proj, newState: 'finished'}
    ],
    text: "🎨 " + vars.n1 + " finished their " + vars.projtype + " project!",
    tags: ['projects']
  })
});

registerAction('showProject_loved', {
  where: [
    '?c1 "name" ?n1',
    '?proj "owner" ?c1',
    '?proj "projectType" ?projtype',
    '?proj "state" "active"',
    '?c2 "type" "char"',
    '?c2 "name" ?n2',
    '(not= ?c1 ?c2)'
  ],
  event: (vars) => ({
    actor: vars.c1,
    target: vars.c2,
    project: vars.proj,
    effects: [
      {type: 'addAttitude', charge: 'positive', source: vars.c1, target: vars.c2},
      {type: 'increaseProjectDrama', project: vars.proj, amount: 1}
    ],
    text: "🎨 " + vars.n1 + " showed their " + vars.projtype + " project to " + vars.n2 + ", who loved it ☺️",
    tags: ['projects']
  })
});

registerAction('showProject_neutral', {
  where: [
    '?c1 "name" ?n1',
    '?proj "owner" ?c1',
    '?proj "projectType" ?projtype',
    '?proj "state" "active"',
    '?c2 "type" "char"',
    '?c2 "name" ?n2',
    '(not= ?c1 ?c2)'
  ],
  event: (vars) => ({
    actor: vars.c1,
    target: vars.c2,
    project: vars.proj,
    effects: [
      {type: 'increaseProjectDrama', project: vars.proj, amount: 1}
    ],
    text: "🎨 " + vars.n1 + " showed their " + vars.projtype + " project to " + vars.n2 +
          ", who was kinda meh about it 😐",
    tags: ['projects']
  })
});

registerAction('showProject_hated', {
  where: [
    '?c1 "name" ?n1',
    '?proj "owner" ?c1',
    '?proj "projectType" ?projtype',
    '?proj "state" "active"',
    '?c2 "type" "char"',
    '?c2 "name" ?n2',
    '(not= ?c1 ?c2)'
  ],
  event: (vars) => ({
    actor: vars.c1,
    target: vars.c2,
    project: vars.proj,
    effects: [
      {type: 'addAttitude', charge: 'negative', source: vars.c2, target: vars.c1},
      {type: 'increaseProjectDrama', project: vars.proj, amount: 1}
    ],
    text: "🎨 " + vars.n1 + " showed their " + vars.projtype + " project to " + vars.n2 + ", who hated it 😡",
    tags: ['projects']
  })
});

registerAction('getDiscouraged', {
  where: [
    // ?e1: ?c1 shows ?proj to ?c2, who hates it
    '?e1 "eventType" "showProject_hated"',
    '?e1 "actor" ?c1',
    '?e1 "project" ?proj',
    '?e1 "target" ?c2',
    // ?e2: ?c1 abandons ?proj
    '?e2 "eventType" "abandonProject"',
    '?e2 "actor" ?c1',
    '?e2 "project" ?proj',
    // ?proj is currently inactive; ?e1 happens before ?e2
    '?proj "state" "inactive"',
    '(< ?e1 ?e2)',
    // extra information for display purposes
    '?proj "projectType" ?projtype',
    '?c1 "name" ?n1',
    '?c2 "name" ?n2'
  ],
  event: (vars) => ({
    actor: vars.c1,
    project: vars.proj,
    effects: [
      {type: 'increaseProjectDrama', project: vars.proj, amount: 1}
    ],
    text: "🎨 " + vars.n1 + " considered restarting their abandoned " + vars.projtype +
          " project, but then remembered " + vars.n2 + "'s negative remarks and decided to leave it alone.",
    tags: ['projects']
  })
});

registerAction('plantTree', {
  where: [
    '?c1 "name" ?n1'
  ],
  event: (vars) => ({
    actor: vars.c1,
    target:vars.c1,
    effects: [
      {type: 'addAttitude', charge: 'positive', source: vars.c1, target: vars.c1}
    ],
    text: "🌳 " + vars.n1 + " planted a tree " +
          randNth(['near their house.', 'at the park.', 'in their backyard.'])
  })
});

registerAction('realizeLove', {
  where: [
    '?affection "type" "affection"',
    '?affection "source" ?c1',
    '?affection "target" ?c2',
    '?affection "level" ?lev',
    '(> ?lev 2)',
    '?c1 "name" ?n1',
    '?c2 "name" ?n2',
    '(not= ?c1 ?c2)',
    '?c1 "romanceTarget" "nobody"'
  ],
  event: (vars) => ({
    actor: vars.c1,
    target: vars.c2,
    effects: [
      {type: 'addAttitude', charge: 'positive', source: vars.c1, target: vars.c2},
      {type: 'realizeLove', affection:vars.affection, romeo:vars.c1, juliet:vars.c2}
    ],
    text: "💓 " + vars.n1 + " is in love with " + vars.n2 + ".",
    tags: ['romance']
  })
});

registerAction('askOut', {
  where: [
    '?c1 "romanceTarget" ?c2',
    '?c2 "romanceTarget" ?c2romanceTarget',
    '?affection "type" "affection"',
    '?affection "source" ?c1',
    '?affection "target" ?c2',
    '?affection "level" ?lev',
    '(> ?lev 4)',
    '?c1 "name" ?n1',
    '?c2 "name" ?n2',
    '(not= ?c1 ?c2)'
  ],
  event: function(vars) {
    if (vars.c2romanceTarget === vars.c1) {
      return {
        actor: vars.c1,
        target: vars.c2,
        effects: [
          {type: 'updateRomanceState', char1:vars.c1, char2: vars.c2, newState: 'dating'}
          //{type: 'addAttitude', charge: 'positive', source: vars.c1, target: vars.c2},
          //{type: 'addAttitude', charge: 'positive', source: vars.c2, target: vars.c1},
          //{type: 'realizedLove', affection:vars.affection, romeo:vars.c1, juliet:vars.c2},
          //{type: 'changeAffectionLevel', affection:vars.affection, amount:1},
        ],
        text: "💞 " + vars.n1 + " is now in a relationship with " + vars.n2+".",
        tags: ['romance']
      }
    } else {
      return {
        actor: vars.c1,
        target: vars.c2,
        effects: [
          {type: 'addAttitude', charge: 'negative', source: vars.c1, target: vars.c2},
          {type: 'changeAffectionLevel', affection:vars.affection, amount:-2}
        ],
        text: "💔 " + vars.n1 + " was brutally rejected by " + vars.n2+".",
        tags: ['romance']
      }
    }
  } 
});

registerAction('propose', {
  where: [
    '?c1 "romanceTarget" ?c2',
    '?c2 "romanceTarget" ?c2romanceTarget',
    '?affection "type" "affection"',
    '?affection "source" ?c1',
    '?affection "target" ?c2',
    '?affection "level" ?lev',
    '?aff2 "type" "affection"',
    '?aff2 "source" ?c2',
    '?aff2 "target" ?c1',
    '?aff2 "level" ?c2Affection',
    '(> ?lev 10)',
    '?c1 "name" ?n1',
    '?c2 "name" ?n2',
    '(not= ?c1 ?c2)',
    '?c1 "romanceState" "dating"',
  ],
  event: function(vars) {
    if (vars.c2Affection > 10) {
      return {
        actor: vars.c1,
        target: vars.c2,
        effects: [
          {type: 'updateRomanceState', char1:vars.c1, char2: vars.c2, newState: 'engaged'}
        ],
        text: "💞 " + vars.n1 + " has proposed to  " + vars.n2+".",
        tags: ['romance']
      }
    } else {
      return {
        actor: vars.c1,
        target: vars.c2,
        effects: [
          {type: 'addAttitude', charge: 'negative', source: vars.c1, target: vars.c2},
          {type: 'changeAffectionLevel', affection:vars.affection, amount:-2}
        ],
        text: "💔 " + vars.n1 + "'s proposal was brutally rejected by ' " + vars.n2+".",
        tags: ['romance']
      }
    }
  }
});

registerAction('married', {
  where: [
    '?c1 "romanceTarget" ?c2',
    '?c2 "romanceTarget" ?c1',
    '?affection "type" "affection"',
    '?affection "source" ?c1',
    '?affection "target" ?c2',
    '?affection "level" ?lev',
    '(> ?lev 15)',
    '?c1 "name" ?n1',
    '?c2 "name" ?n2',
    '(not= ?c1 ?c2)',
    '?c1 "romanceState" "engaged"',
  ],
  event: function(vars) {
    return {
      actor: vars.c1,
      target: vars.c2,
      effects: [
        {type: 'updateRomanceState', char1:vars.c1, char2: vars.c2, newState: 'married'}
        
      ],
      text: "💞 " + vars.n1 + " is married to  " + vars.n2+".",
      tags: ['romance']
    }
  }
});

registerAction('haveKids', {
  where: [
    '?c1 "romanceTarget" ?c2',
    '?c2 "romanceTarget" ?c2romanceTarget',
    '?affection "type" "affection"',
    '?affection "source" ?c1',
    '?affection "target" ?c2',
    '?affection "level" ?lev',
    '(> ?lev 20)',
    '?c1 "name" ?n1',
    '?c2 "name" ?n2',
    '(not= ?c1 ?c2)',
    '?c1 "romanceState" "married"',
    '?c2 "romanceState" "married"',
  ],
  event: function(vars) {
    return {
      actor: vars.c1,
      target: vars.c2,
      effects: [
        {type: 'updateRomanceState', char1:vars.c1, char2: vars.c2, newState: 'haveKids'}
      ],
      text: "👪 " + vars.n1 + " and  " + vars.n2+" now have a kid.",
      tags: ['romance']
    }
  } 
});

registerAction('breakUp', {
  where: [
    '?c1 "romanceTarget" ?c2',
    '?c2 "romanceTarget" ?c2romanceTarget',
    '?affection "type" "affection"',
    '?affection "source" ?c1',
    '?affection "target" ?c2',
    '?affection "level" ?lev',
    '(< ?lev 5)',
    '?c1 "name" ?n1',
    '?c2 "name" ?n2',
    '(not= ?c1 ?c2)',
    '(or [?c1 "romanceState" "dating"]\
     [?c1 "romanceState" "engaged"])'
  ],
  event: function(vars) {
    return {
      actor: vars.c1,
      target: vars.c2,
      effects: [
        {type: 'updateRomanceState', char1:vars.c1, char2: vars.c2, newState: 'single'}
        
      ],
      text: "💔 " + vars.n1 + " and  " + vars.n2+" have broken up.",
      tags: ['romance']
    }
  } 
});

registerAction('cheated', {
  where: [
    '?c1 "romanceTarget" ?c2',
    '?c2 "romanceTarget" ?c2romanceTarget',
    '?affection "type" "affection"',
    '?affection "source" ?c1',
    '?affection "target" ?c2',
    '?affection "level" ?lev',
    '(< ?lev 5)',
    '?c1 "name" ?n1',
    '?c2 "name" ?n2',
    '(not= ?c1 ?c2)',
    '(or [?c1 "romanceState" "dating"]\
         [?c1 "romanceState" "engaged"]\
         [?c1 "romanceState" "married"])'

  ],
  event: function(vars) {
    return {
      actor: vars.c1,
      target: vars.c2,
      effects: [
        {type: 'updateRomanceState', char1:vars.c1, char2: vars.c2, newState: 'single'}
        
      ],
      text: "💔 " + vars.n1 + " and  " + vars.n2+" have broken up due to cheating.",
      tags: ['romance']
    }
  } 
});

registerAction('divorce', {
  where: [
    '?c1 "romanceTarget" ?c2',
    '?c2 "romanceTarget" ?c2romanceTarget',
    '?affection "type" "affection"',
    '?affection "source" ?c1',
    '?affection "target" ?c2',
    '?affection "level" ?lev',
    '(< ?lev 10)',
    '?c1 "name" ?n1',
    '?c2 "name" ?n2',
    '(not= ?c1 ?c2)',
    '?c1 "romanceState" "married"',
    '?c2 "romanceState" "married"'
  ],
  event: function(vars) {
    return {
      actor: vars.c1,
      target: vars.c2,
      effects: [
        {type: 'updateRomanceState', char1:vars.c1, char2: vars.c2, newState: 'single'}
        
      ],
      text: "💔 " + vars.n1 + " and  " + vars.n2+" have divorced due to cheating.",
      tags: ['romance']
    }
  } 
});

registerAction('getPet', {
  where: ['?c1 "name" ?n1'],
  event: (vars) => ({
    actor: vars.c1,
    effects: [
      {type: 'changeAttitudeTowardSelf', amount: 1, target: vars.c1}
    ],
    text: "🐶 " + vars.n1 + " got a new pet."
  })
});

registerAction('upstagedMyEnemy', {
  where: ['?c1 "name" ?n1'],
  event: (vars) => ({
    actor: vars.c1,
    effects: [
      {type: 'changeAttitudeTowardSelf', amount: 1, target: vars.c1}
    ],
    text: "😤 " + vars.n1 + " upstaged their enemy.",
    tags: ['rivalry']
  })
});

registerAction('wasUpstagedMyEnemy', {
  where: ['?c1 "name" ?n1'],
  event: (vars) => ({
    actor: vars.c1,
    effects: [
      {type: 'changeAttitudeTowardSelf', amount: -1, target: vars.c1}
    ],
    text: "😤 " + vars.n1 + " was upstaged by their enemy.",
    tags: ['rivalry']
  })
});

registerAction('didWellOnTest', {
  where: ['?c1 "name" ?n1'],
  event: (vars) => ({
    actor: vars.c1,
    effects: [
      {type: 'changeAttitudeTowardSelf', amount: 1, target: vars.c1}
    ],
    text: "💯 " + vars.n1 + " did well on a test."
  })
});

registerAction('didPoorlyOnTest', {
  where: ['?c1 "name" ?n1'],
  event: (vars) => ({
    actor: vars.c1,
    effects: [
      {type: 'changeAttitudeTowardSelf', amount: -1, target: vars.c1}
    ],
    text: "☹️ " + vars.n1 + " did poorly on a test."
  })
});

registerAction('gotTheJob', {
  where: ['?c1 "name" ?n1'],
  event: (vars) => ({
    actor: vars.c1,
    effects: [
      {type: 'changeAttitudeTowardSelf', amount: 1, target: vars.c1}
    ],
    text: "💼 " + vars.n1 + " got a job."
  })
});

registerAction('didNotGetTheJob', {
  where: ['?c1 "name" ?n1'],
  event: (vars) => ({
    actor: vars.c1,
    effects: [
      {type: 'changeAttitudeTowardSelf', amount: -1, target: vars.c1}
    ],
    text: "🚫💼 " + vars.n1 + " did not get a job."
  })
});

registerAction('hadAJobInterview', {
  where: ['?c1 "name" ?n1'],
  event: (vars) => ({
    actor: vars.c1,
    text: "💼 " + vars.n1 + " had an interview."
  })
});

registerAction('firedFromJob', {
  where: ['?c1 "name" ?n1'],
  event: (vars) => ({
    actor: vars.c1,
    effects: [
      {type: 'changeAttitudeTowardSelf', amount: -1, target: vars.c1}
    ],
    text: "🔥 " + vars.n1 + " was fired from their job."
  })
});

registerAction('lostWeight', {
  where: ['?c1 "name" ?n1'],
  event: (vars) => ({
    actor: vars.c1,
    effects: [
      {type: 'changeAttitudeTowardSelf', amount: 1, target: vars.c1}
    ],
    text: "🥗 " + vars.n1 + " lost weight."
  })
});

registerAction('danced', {
  where: ['?c1 "name" ?n1'],
  event: (vars) => ({
    actor: vars.c1,
    effects: [
      {type: 'changeAttitudeTowardSelf', amount: 1, target: vars.c1}
    ],
    text: "💃 " + vars.n1 + " danced."
  })
});

registerAction('feltHappy', {
  where: ['?c1 "name" ?n1'],
  event: (vars) => ({
    actor: vars.c1,
    effects: [
      {type: 'changeAttitudeTowardSelf', amount: 1, target: vars.c1}
    ],
    text: "😃 " + vars.n1 + " felt happy."
  })
});

registerAction('feltSad', {
  where: ['?c1 "name" ?n1'],
  event: (vars) => ({
    actor: vars.c1,
    effects: [
      {type: 'changeAttitudeTowardSelf', amount: -1, target: vars.c1}
    ],
    text: "😢 " + vars.n1 + " felt sad."
  })
});

registerAction('gotDrunk', {
  where: ['?c1 "name" ?n1'],
  event: (vars) => ({
    actor: vars.c1,
    effects: [
      {type: 'changeAttitudeTowardSelf', amount: randNth([-1, 1]), target: vars.c1}
    ],
    text: "🍷 " + vars.n1 + " got drunk."
  })
});

registerAction('meditated', {
  where: ['?c1 "name" ?n1'],
  event: (vars) => ({
    actor: vars.c1,
      target: vars.c1,
       effects: [
       {type: 'changeAttitudeTowardSelf', amount: 1, target: vars.c1}
       ],
      text: "🙏 "+vars.n1 + " meditated. "
  })
});

registerAction('didChores', {
  where: ['?c1 "name" ?n1'],
  event: (vars) => ({
    actor: vars.c1,
    effects: [
      {type: 'changeAttitudeTowardSelf', amount: 1, target: vars.c1}
    ],
    text: "🏠 " + vars.n1 + " did chores."
  })
});

registerAction('daydreamed', {
  where: ['?c1 "name" ?n1'],
  event: (vars) => ({
    actor: vars.c1,
    effects: [
      {type: 'changeAttitudeTowardSelf', amount: 0, target: vars.c1}
    ],
    text: "💭 " + vars.n1 + " daydreamed."
  })
});

registerAction('movedHouses', {
  where: ['?c1 "name" ?n1'],
  event: (vars) => ({
    actor: vars.c1,
    effects: [
      {type: 'changeAttitudeTowardSelf', amount: 1, target: vars.c1}
    ],
    text: "🏠 " + vars.n1 + " moved houses."
  })
});

registerAction('readBook', {
  where: ['?c1 "name" ?n1'],
  event: (vars) => ({
    actor: vars.c1,
    effects: [
      {type: 'changeAttitudeTowardSelf', amount: 1, target: vars.c1}
    ],
    text: "📖 " + vars.n1 + " read a book."
  })
});

registerAction('lookedAtArt', {
  where: ['?c1 "name" ?n1'],
  event: (vars) => ({
    actor: vars.c1,
    effects: [
      {type: 'changeAttitudeTowardSelf', amount: 1, target: vars.c1}
    ],
    text: "🖼 " + vars.n1 + " looked at art."
  })
});

registerAction('studied', {
  where: ['?c1 "name" ?n1'],
  event: (vars) => ({
    actor: vars.c1,
    effects: [
      {type: 'changeAttitudeTowardSelf', amount: 1, target: vars.c1}
    ],
    text: "📖 " + vars.n1 + " studied."
  })
});

registerAction('tookAWalk', {
  where: ['?c1 "name" ?n1'],
  event: (vars) => ({
    actor: vars.c1,
    effects: [
      {type: 'changeAttitudeTowardSelf', amount: 1, target: vars.c1}
    ],
    text: "🚶 " + vars.n1 + " took a walk."
  })
});

registerAction('stormed', {
  event: (vars) => ({
    text: "🌩 It stormed.",
    tags: ['weather']
  })
});

registerAction('waitedInTraffic', {
  where: ['?c1 "name" ?n1'],
  event: (vars) => ({
    actor: vars.c1,
    effects: [
      {type: 'changeAttitudeTowardSelf', amount: -1, target: vars.c1}
    ],
    text: "🚦 " + vars.n1 + " waited in traffic."
  })
});

registerAction('wentToAParty', {
  where: ['?c1 "name" ?n1'],
  event: (vars) => ({
    actor: vars.c1,
    effects: [
      {type: 'changePopularity', amount: 1, target: vars.c1}
    ],
    text: "🎉 " + vars.n1 + " went to a party."
  })
});

registerAction('wentToASportsGame', {
  where: ['?c1 "name" ?n1'],
  event: (vars) => ({
    actor: vars.c1,
    effects: [
      {type: 'changePopularity', amount: 1, target: vars.c1}
    ],
    text: "🏀 " + vars.n1 + " went to a sports game."
  })
});

registerAction('exercise', {
  where: ['?c1 "name" ?n1'],
  event: (vars) => ({
    actor: vars.c1,
    effects: [        
      {type: 'changeAttitudeTowardSelf', target:vars.c1, amount:1}
    ],
    text: "💪 " + vars.n1 + " exercised."
  })
});

registerAction('wentToTheGym', {
  where: ['?c1 "name" ?n1'],
  event: (vars) => ({
    actor: vars.c1,
    effects: [
      {type: 'changeAttitudeTowardSelf', amount:1, target:vars.c1}
    ],
    text: "🏋 " + vars.n1 + " went to the gym."
  })
});

registerAction('goSwimming', {
  where: [
    '?c1 "name" ?n1'
  ],
  event: (vars) => ({
    actor: vars.c1,
    effects: [
      {type: 'changeAttitudeTowardSelf', target: vars.c1, amount: 1}
    ],
    text: "🏊 " + vars.n1 + " went swimming." 
  })
});

registerAction('goDriving', {
	where: [
		'?c1 "name" ?n1'
	],
	event: (vars) => ({
		actor: vars.c1,
		effects: [
			{type: 'changeAttitudeTowardSelf', target: vars.c1, amount: 1}
		],
		text: "🚗 " + vars.n1 + " went on a drive."
	})
}); 

registerAction('goRunning', {
	where: [
		'?c1 "name" ?n1'
	],
	event: (vars) => ({
		actor: vars.c1,
		effects: [
			{type: 'changeAttitudeTowardSelf', target: vars.c1, amount: 1}
		],
		text: "🏃 " + vars.n1 + " went on a run."
	})
});

registerAction('goOnDateWith', {
  where: [
    '?c1 "name" ?n1',
    '?c2 "name" ?n2',
    '(not= ?c1 ?c2)',
    '?a1 "type" "affection"',
    '?a1 "source" ?c1',
    '?a1 "target" ?c2',
    '?a2 "type" "affection"',
    '?a2 "source" ?c2',
    '?a2 "target" ?c1'
  ],
  event: (vars) => ({
    actor: vars.c1,
    target: vars.c2,
    effects: [
      {type: 'changeAffectionLevel', affection:vars.a1, amount: randNth([-1, 1, 2])},
      {type: 'changeAffectionLevel', affection:vars.a2, amount: randNth([-1, 1, 2])}
    ],
    text: "😘 " + vars.n1 + " and " + vars.n2 +
          " went on a date at " + randNth(['the boba shop.','the movies.','italian restaurant.']),
    tags: ['romance']
  })
});

registerAction('goOutWith', {
  where: [
    '?c1 "name" ?n1',
    '?c2 "name" ?n2',
    '(not= ?c1 ?c2)',
    '?a1 "type" "affection"',
    '?a1 "source" ?c1',
    '?a1 "target" ?c2',
    '?a2 "type" "affection"',
    '?a2 "source" ?c2',
    '?a2 "target" ?c1'
  ],
  event: (vars) => ({
    actor: vars.c1,
    target: vars.c2,
    effects: [
      {type: 'changeAffectionLevel', affection:vars.a1, amount: +1},
      {type: 'changeAffectionLevel', affection:vars.a2, amount: +1},
      {type: 'changePopularity', target: vars.c1, amount: +1},
      {type: 'changePopularity', target: vars.c2, amount: +1},
    ],
    text: "🤪 " + vars.n1 + randNth([' ate out ',' went on a picnic ', 
	    	  ' went hiking ', ' went camping ', ' went to the zoo ', ' shopped ', ' went on vacation ' ]) +
          "with " + vars.n2 + '.'
 })
});

registerAction('wentToSchool', {
  where: [
    '?c1 "name" ?n1'
  ],
  event: (vars) => ({
    actor: vars.c1,
    text: "🏫 " + vars.n1 + " went to school." 
  })
});

registerAction('pickedFlower', {
  where: [
    '?c1 "name" ?n1'
  ],
  event: (vars) => ({
    actor: vars.c1,
    text: "🌺 " + vars.n1 + " picked a flower." 
  })
});

registerAction('didNothing', {
	where: [
		'?c1 "name" ?n1'
	],
	event: (vars) => ({
		actor: vars.c1,
		effects: [
			{type: 'changeAttitudeTowardSelf', target: vars.c1, amount: -1}
		],
		text: "😒 " + vars.n1 + " was unproductive."
	})
});

registerAction('gotSick', {
	where: [
		'?c1 "name" ?n1'
	],
	event: (vars) => ({
		actor: vars.c1,
		effects: [
			{type: 'changeAttitudeTowardSelf', target: vars.c1, amount: -1}
		],
		text: "🤢 " + vars.n1 + " got sick."
	})
});

registerAction('madeAnEnemy', {
  where: [
    '?c1 "name" ?n1',
    '?c2 "name" ?n2',
    '(not= ?c1 ?c2)',
    '?a1 "type" "affection"',
    '?a1 "source" ?c1',
    '?a1 "target" ?c2',
    '?a2 "type" "affection"',
    '?a2 "source" ?c2',
    '?a2 "target" ?c1'
  ],
  event: (vars) => ({
    actor: vars.c1,
    target: vars.c2,
    effects: [
      {type: 'changeAffectionLevel', affection:vars.a1, amount: -1},
      {type: 'changeAffectionLevel', affection:vars.a2, amount: -1},
      {type: 'changePopularity', target: vars.c1, amount: -1},
      {type: 'changePopularity', target: vars.c2, amount: -1}
    ],
    text: "😡 " + vars.n1 + " and " + vars.n2 + " are now enemies.",
    tags: ['rivalry']
  })
});

registerAction('wentToWork', {
	where: [
		'?c1 "name" ?n1'
	],
	event: (vars) => ({
		actor: vars.c1,
		effects: [
			{type: 'changeAttitudeTowardSelf', target: vars.c1, amount: +1}
		],
		text: "👔 " + vars.n1 + " went to work."
	})
});

registerAction('wentToClass', {
	where: [
		'?c1 "name" ?n1'
	],
	event: (vars) => ({
		actor: vars.c1,
		effects: [
			{type: 'changeAttitudeTowardSelf', target: vars.c1, amount: +1}
		],
		text: "📝 " + vars.n1 + " went to a class."
	})
});

registerAction('getIntoFight', {
  where: [
    '?c1 "name" ?n1',
    '?c2 "name" ?n2',
    '(not= ?c1 ?c2)',
    '?a1 "type" "affection"',
    '?a1 "source" ?c1',
    '?a1 "target" ?c2',
    '?a2 "type" "affection"',
    '?a2 "source" ?c2',
    '?a2 "target" ?c1'
  ],
  event: (vars) => ({
    actor: vars.c1,
    target: vars.c2,
    effects: [
      {type: 'changeAffectionLevel', affection:vars.a1, amount: -1},
      {type: 'changeAffectionLevel', affection:vars.a2, amount: -1}
    ],
    text: "😔 " + vars.n1 + " and " + vars.n2 + " got into a fight."
 })
});
 
registerAction('wentToDoctor_good', {
  where: [
    '?c1 "name" ?n1',
  ],
  event: (vars) => ({
    actor: vars.c1,
    effects: [
      {type: 'changeAttitudeTowardSelf', target: vars.c1, amount: 1},
    ],
    text: "🏥 " + vars.n1 + "'s doctor appointment went well!"
  })
});

registerAction('wentToDoctor_neutral', {
  where: [
    '?c1 "name" ?n1',
  ],
  event: (vars) => ({
    actor: vars.c1,
    text: "🏥 " + vars.n1 + "'s doctor appointment went normal."
  })
});

registerAction('wentToDoctor_bad', {
  where: [
    '?c1 "name" ?n1',
  ],
  event: (vars) => ({
    actor: vars.c1,
    effects: [
      {type: 'changeAttitudeTowardSelf', target: vars.c1, amount: -1},
    ],
    text: "🏥 " + vars.n1 + "'s doctor appointment went bad."
  })
});

registerAction('surfedInternet_good', {
  where: [
    '?c1 "name" ?n1',
  ],
  event: (vars) => ({
    actor: vars.c1,
    effects: [
      {type: 'changeAttitudeTowardSelf', target: vars.c1, amount: 1},
    ],
    text: "💻 " + vars.n1 + " had fun surfing the internet!"
  })
});

registerAction('surfedInternet_neutral', {
  where: [
    '?c1 "name" ?n1',
  ],
  event: (vars) => ({
    actor: vars.c1,
    text: "💻 " + vars.n1 + " felt meh after surfing the internet."
  })
});

registerAction('surfedInternet_bad', {
  where: [
    '?c1 "name" ?n1',
  ],
  event: (vars) => ({
    actor: vars.c1,
    effects: [
      {type: 'changeAttitudeTowardSelf', target: vars.c1, amount: -1},
    ],
    text: "💻 " + vars.n1 + " felt bad after spending time on the internet."
  })
});

registerAction('playedVideoGames_good', {
  where: [
    '?c1 "name" ?n1',
  ],
  event: (vars) => ({
    actor: vars.c1,
    effects: [
      {type: 'changeAttitudeTowardSelf', target: vars.c1, amount: 1},
    ],
    text: "🎮 " + vars.n1 + " had fun playing video games!"
  })
});

registerAction('playedVideoGames_neutral', {
  where: [
    '?c1 "name" ?n1',
  ],
  event: (vars) => ({
    actor: vars.c1,
    text: "🎮 " + vars.n1 + " felt meh after playing video games."
  })
});

registerAction('playedVideoGames_bad', {
  where: [
    '?c1 "name" ?n1',
  ],
  event: (vars) => ({
    actor: vars.c1,
    effects: [
      {type: 'changeAttitudeTowardSelf', target: vars.c1, amount: -1},
    ],
    text: "🎮 " + vars.n1 + " felt bad after playing video games."
  })
});

registerAction('bingeWatchedTV_good', {
  where: [
    '?c1 "name" ?n1',
  ],
  event: (vars) => ({
    actor: vars.c1,
    effects: [
      {type: 'changeAttitudeTowardSelf', target: vars.c1, amount: 1},
    ],
    text: "📺 " + vars.n1 + " had fun binge-watching TV!"
  })
});

registerAction('bingeWatchedTV_neutral', {
  where: [
    '?c1 "name" ?n1',
  ],
  event: (vars) => ({
    actor: vars.c1,
    effects: [],
    text: "📺 " + vars.n1 + " felt meh after binge-watching TV."
  })
});

registerAction('bingeWatchedTV_bad', {
  where: [
    '?c1 "name" ?n1',
  ],
  event: (vars) => ({
    actor: vars.c1,
    effects: [
      {type: 'changeAttitudeTowardSelf', target: vars.c1, amount: -1},
    ],
    text: "📺 " + vars.n1 + " felt bad after binge-watching TV."
  })
});

registerAction('chattedWithAStranger', {
  where: [
    '?c1 "name" ?n1'
  ],
  event: (vars) => ({
    actor: vars.c1,
    effects: [
      {type: 'changePopularity', target: vars.c1, amount: +1}
    ],
    text: "👥 " + vars.n1 + " chatted with a stranger."
  })
});

registerAction('acceptedIntoProgram', {
  where: ['?c1 "name" ?n1'],
  event: (vars) => ({
    actor: vars.c1,
    effects: [
      {type: 'changeAttitudeTowardSelf', amount: 1, target: vars.c1}
    ],
    text: "🏆 " + vars.n1 + " was accepted into a program."
  })
});

registerAction('rejectedFromProgram', {
  where: ['?c1 "name" ?n1'],
  event: (vars) => ({
    actor: vars.c1,
    effects: [
      {type: 'changeAttitudeTowardSelf', amount: -1, target: vars.c1}
    ],
    text: "😔 " + vars.n1 + " was rejected from a program."
  })
});

registerAction('performed_good', {
  where: [
    '?c1 "name" ?n1',
  ],
  event: (vars) => ({
    actor: vars.c1,
    effects: [
      {type: 'changeAttitudeTowardSelf', target: vars.c1, amount: 1},
    ],
    text: "🎭 " + vars.n1 + " felt great after performing in front of an audience!"
  })
});

registerAction('performed_neutral', {
  where: [
    '?c1 "name" ?n1',
  ],
  event: (vars) => ({
    actor: vars.c1,
    text: "🎭 " + vars.n1 + " felt meh after their performance in front of an audience."
  })
});

registerAction('performed_bad', {
  where: [
    '?c1 "name" ?n1',
  ],
  event: (vars) => ({
    actor: vars.c1,
    effects: [
      {type: 'changeAttitudeTowardSelf', target: vars.c1, amount: -1},
    ],
    text: "🎭 " + vars.n1 + " felt bad after their performance in front of an audience."
  })
});

registerAction('chattedWithSomeone', {
  where: [
    '?c1 "name" ?n1',
    '?c2 "name" ?n2',
    '(not= ?c1 ?c2)',
    '?a1 "type" "affection"',
    '?a1 "source" ?c1',
    '?a1 "target" ?c2',
    '?a2 "type" "affection"',
    '?a2 "source" ?c2',
    '?a2 "target" ?c1'
  ],
  event: (vars) => ({
    actor: vars.c1,
    target: vars.c2,
    effects: [
      {type: 'changeAffectionLevel', affection:vars.a1, amount: +1},
      {type: 'changeAffectionLevel', affection:vars.a2, amount: +1},
      {type: 'changePopularity', target: vars.c1, amount: +1},
      {type: 'changePopularity', target: vars.c2, amount: +1}
    ],
    text: "🧑‍🤝‍🧑 " + vars.n1 + " and " + vars.n2 + " chatted with each other."
  })
});

registerAction('workedWithSomeone', {
  where: [
    '?c1 "name" ?n1',
    '?c2 "name" ?n2',
    '(not= ?c1 ?c2)',
    '?a1 "type" "affection"',
    '?a1 "source" ?c1',
    '?a1 "target" ?c2',
    '?a2 "type" "affection"',
    '?a2 "source" ?c2',
    '?a2 "target" ?c1'
  ],
  event: (vars) => ({
    actor: vars.c1,
    target: vars.c2,
    effects: [
      {type: 'changeAffectionLevel', affection:vars.a1, amount: +1},
      {type: 'changeAffectionLevel', affection:vars.a2, amount: +1},
      {type: 'changePopularity', target: vars.c1, amount: +1},
      {type: 'changePopularity', target: vars.c2, amount: +1}
    ],
    text: "🧑‍🤝‍🧑 " + vars.n1 + " and " + vars.n2 + " worked with each other."
  })
});

registerAction('playedInFountain', {
  where: [
    '?c1 "name" ?n1'
  ],
  event: (vars) => ({
    actor: vars.c1,
    effects: [
      {type: 'changeAttitudeTowardSelf', target: vars.c1, amount: 1}
    ],
    text: "⛲ " + vars.n1 + " played in a fountain."
  })
});

registerAction('makeAWishInFountain', {
  where: [
    '?c1 "name" ?n1'
  ],
  event: (vars) => ({
    actor: vars.c1,
    effects: [
      {type: 'changeAttitudeTowardSelf', target: vars.c1, amount: 1}
    ],
    text: "⛲ " + vars.n1 + " made a wish in a fountain."
  })
});

registerAction('gotInAFight', {
  where: [
    '?c1 "name" ?n1'
  ],
  event: (vars) => ({
    actor: vars.c1,
    effects: [
      {type: 'changeAttitudeTowardSelf', target: vars.c1, amount: -1}
    ],
    text: "⚔️ " + vars.n1 + " got in a fight."
  })
});

registerAction('playedCatch', {
  where: [
    '?c1 "name" ?n1'
  ],
  event: (vars) => ({
    actor: vars.c1,
    effects: [
      {type: 'changeAttitudeTowardSelf', target: vars.c1, amount: 1}
    ],
    text: "🎾 " + vars.n1 + " played catch."
  })
});

registerAction('staredAtPhone', {
  where: [
    '?c1 "name" ?n1'
  ],
  event: (vars) => ({
    actor: vars.c1,
    effects: [
      {type: 'changeAttitudeTowardSelf', target: vars.c1, amount: 0}
    ],
    text: "📱 " + vars.n1 + " stared at their phone."
  })
});

registerAction('waitedForBus', {
  where: [
    '?c1 "name" ?n1'
  ],
  event: (vars) => ({
    actor: vars.c1,
    effects: [
      {type: 'changeAttitudeTowardSelf', target: vars.c1, amount: -1}
    ],
    text: "🚌 " + vars.n1 + " waited for the bus."
  })
});

registerAction('skateboard', {
  where: [
    '?c1 "name" ?n1'
  ],
  event: (vars) => ({
    actor: vars.c1,
    effects: [
      {type: 'changeAttitudeTowardSelf', target: vars.c1, amount: 1}
    ],
    text: " " + vars.n1 + " went skateboarding."
  })
});

registerAction('walkedPet', {
  where: [
    '?c1 "name" ?n1'
  ],
  event: (vars) => ({
    actor: vars.c1,
    effects: [
      {type: 'changeAttitudeTowardSelf', target: vars.c1, amount: 1}
    ],
    text: "🐶 " + vars.n1 + " walked their pet."
  })
});

registerAction('wentToPark', {
  where: [
    '?c1 "name" ?n1'
  ],
  event: (vars) => ({
    actor: vars.c1,
    effects: [
      {type: 'changeAttitudeTowardSelf', target: vars.c1, amount: 1}
    ],
    text: "🏞️ " + vars.n1 + " went to the park."
  })
});

registerAction('laidOnGrass', {
  where: [
    '?c1 "name" ?n1'
  ],
  event: (vars) => ({
    actor: vars.c1,
    effects: [
      {type: 'changeAttitudeTowardSelf', target: vars.c1, amount: 1}
    ],
    text: "🌿 " + vars.n1 + " laid on grass."
  })
});

registerAction('madeSnowAngels', {
  where: [
    '?c1 "name" ?n1'
  ],
  event: (vars) => ({
    actor: vars.c1,
    effects: [
      {type: 'changeAttitudeTowardSelf', target: vars.c1, amount: 1}
    ],
    text: "🌨️ " + vars.n1 + " made snow angels."
  })
});

registerAction('hot', {
  event: (vars) => ({
    text: "☀️ It was hot.",
    tags: ['weather']
  })
});

registerAction('cold', {
  event: (vars) => ({
    text: "❄️ It was cold.",
    tags: ['weather']
  })
});

registerAction('windy', {
  event: (vars) => ({
    text: "💨 It was windy.",
    tags: ['weather']
  })
});

registerAction('snowed', {
  event: (vars) => ({
    text: "🌨️ It snowed.",
    tags: ['weather']
  })
});

registerAction('hailed', {
  event: (vars) => ({
    text: "🌨️ It hailed.",
    tags: ['weather']
  })
});

registerAction('freezing', {
  event: (vars) => ({
    text: "❄️ It was freezing.",
    tags: ['weather']
  })
});

registerAction('cloudy', {
  event: (vars) => ({
    text: "☁️ It was cloudy.",
    tags: ['weather']
  })
});

registerAction('rainy', {
  event: (vars) => ({
    text: "☔ It was rainy.",
    tags: ['weather']
  })
});

registerAction('skipping', {
  where: ['?c1 "name" ?n1'],
  event: (vars) => ({
    actor: vars.c1,
    text: "🚶 " + vars.n1 + " was " + randNth(["skipping.", "power walking."])
  })
});

registerAction('movedAndMissingSomeone', {
  where: [
    '?e1 eventType moved',
    '?e2 eventType missing-someone',
    '(< ?e1 ?e2)',
    '?e1 actor ?c1',
    '?e2 actor ?c1',
    '?c1 name ?n1',
    '?c2 name ?n2'
  ],
  event: (vars) => ({
    actor: vars.c1,
    target: vars.c1,
    effects: [
      {type: 'changeAttitudeTowardSelf', target:vars.c1, amount:-1}
    ],
    text: "🏠😔 " + vars.n1 +
          " moved but misses " + vars.n2 + "."
  })
});

registerAction('readAndGoodIdea', {
  where: [
    '(or [?e1 "eventType" "read"]\
        [?e1 "eventType" "finished-book"])',
    '?e2 eventType good-idea',
    '(< ?e1 ?e2)',
    '?e1 actor ?c1',
    '?e2 actor ?c1',
    '?c1 name ?n1',
    '(not-join [?c1 ?e1 ?e2]\
        [?eMid "actor" ?c1]\
        [(< ?e1 ?eMid ?e2)])'
  ],
  event: (vars) => ({
    actor: vars.c1,
    target: vars.c1,
    effects: [
      {type: 'changeAttitudeTowardSelf', target:vars.c1, amount:1}
    ],
    text: "📖💡 " + vars.n1 +
          " read a book then got a good idea."
  })
});

registerAction('wentToPartyAndDinedOut', {
  where: [
    '?e1 eventType went-to-party',
    '?e2 eventType dined-out',
    '(< ?e1 ?e2)',
    '?e1 actor ?c1',
    '?e2 actor ?c1',
    '?c1 name ?n1',
  ],
  event: (vars) => ({
    actor: vars.c1,
    target: vars.c1,
    effects: [
      {type: 'changePopularity', target:vars.c1, amount:1}
    ],
    text: "🎉🍔 " + vars.n1 +
          " went to a party and went for food."
  })
});

// Change attitude towards self, popularity, and workload through mainScript.js
// so that we can utilize siftpatterns.js instead of actions.js
