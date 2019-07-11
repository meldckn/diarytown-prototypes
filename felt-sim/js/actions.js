/// ACTION DEFINITIONS

actionLibrary.betray = {
  type: 'betray',
  find: '?c1 ?n1 ?c2 ?n2',
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
};

actionLibrary.hangOutWith = {
  type: 'hangOutWith',
  find: '?c1 ?n1 ?c2 ?n2 ?a1 ?a2',
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
};

actionLibrary.seeCuteAnimal = {
  type: 'seeCuteAnimal',
  find: '?c1 ?n1',
  where: [
    '?c1 "name" ?n1'
  ],
  event: (vars) => ({
    actor: vars.c1,
    target: vars.c1,
    effects: [],
    text: "🐶 " + vars.n1 + " saw a cute " + randNth(['dog','cat','snake']) + "."
  })
};

let allProjectTypes = ['art','craft','poetry','programming','research','writing'];

actionLibrary.startProject = {
  type: 'startProject',
  find: '?c1 ?n1',
  where: [
    '?c1 "name" ?n1'
  ],
  event: function(vars){
    let projectType = randNth(allProjectTypes);
    return {
      actor: vars.c1,
      target: vars.c1,
      // TODO need to specify project: somehow, but can't, because its ID is only generated
      // once the effects are run
      effects: [
        {type: 'startProject', owner: vars.c1, projectType: projectType}
      ],
      text: "🎨 " + vars.n1 + " started a new " + projectType + " project!"
    };
  }
};

actionLibrary.makeProgressOnProject = {
  type: 'makeProgressOnProject',
  find: '?c1 ?n1 ?proj ?projtype',
  where: [
    '?c1 "name" ?n1',
    '?proj "owner" ?c1',
    '?proj "projectType" ?projtype',
    '?proj "state" "active"'
  ],
  event: (vars) => ({
    actor: vars.c1,
    target: vars.c1,
    project: vars.proj,
    effects: [
      {type: 'increaseProjectDrama', project: vars.proj, amount: 1}
    ],
    text: "🎨 " + vars.n1 + " made a lot of progress on their " + vars.projtype + " project."
  })
};

actionLibrary.workFruitlesslyOnProject = {
  type: 'workFruitlesslyOnProject',
  find: '?c1 ?n1 ?proj ?projtype',
  where: [
    '?c1 "name" ?n1',
    '?proj "owner" ?c1',
    '?proj "projectType" ?projtype',
    '?proj "state" "active"'
  ],
  event: (vars) => ({
    actor: vars.c1,
    target: vars.c1,
    project: vars.proj,
    effects: [
      {type: 'increaseProjectDrama', project: vars.proj, amount: 1}
    ],
    text: "🎨 " + vars.n1 + " tried to work on their " + vars.projtype + " project, but got nowhere."
  })
};

actionLibrary.abandonProject = {
  type: 'abandonProject',
  find: '?c1 ?n1 ?proj ?projtype',
  where: [
    '?c1 "name" ?n1',
    '?proj "owner" ?c1',
    '?proj "projectType" ?projtype',
    '?proj "state" "active"'
  ],
  event: (vars) => ({
    actor: vars.c1,
    target: vars.c1,
    project: vars.proj,
    effects: [
      {type: 'updateProjectState', project: vars.proj, newState: 'inactive'},
      {type: 'increaseProjectDrama', project: vars.proj, amount: 2}
    ],
    text: "🎨 " + vars.n1 + " gave up on their " + vars.projtype + " project."
  })
};

actionLibrary.resumeProject = {
  type: 'resumeProject',
  find: '?c1 ?n1 ?proj ?projtype',
  where: [
    '?c1 "name" ?n1',
    '?proj "owner" ?c1',
    '?proj "projectType" ?projtype',
    '?proj "state" "inactive"'
  ],
  event: (vars) => ({
    actor: vars.c1,
    target: vars.c1,
    project: vars.proj,
    effects: [
      {type: 'updateProjectState', project: vars.proj, newState: 'active'},
      {type: 'increaseProjectDrama', project: vars.proj, amount: 2}
    ],
    text: "🎨 " + vars.n1 + " started working on their " + vars.projtype + " project again!"
  })
};

actionLibrary.finishProject = {
  type: 'finishProject',
  find: '?c1 ?n1 ?proj ?projtype',
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
    target: vars.c1,
    project: vars.proj,
    effects: [
      {type: 'updateProjectState', project: vars.proj, newState: 'finished'}
    ],
    text: "🎨 " + vars.n1 + " finished their " + vars.projtype + " project!"
  })
};

actionLibrary.showProject_loved = {
  type: 'showProject_loved',
  find: '?c1 ?n1 ?proj ?projtype ?c2 ?n2',
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
    text: "🎨 " + vars.n1 + " showed their " + vars.projtype + " project to " + vars.n2 + ", who loved it ☺️"
  })
};

actionLibrary.showProject_neutral = {
  type: 'showProject_neutral',
  find: '?c1 ?n1 ?proj ?projtype ?c2 ?n2',
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
          ", who was kinda meh about it 😐"
  })
};

actionLibrary.showProject_hated = {
  type: 'showProject_hated',
  find: '?c1 ?n1 ?proj ?projtype ?c2 ?n2',
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
    text: "🎨 " + vars.n1 + " showed their " + vars.projtype + " project to " + vars.n2 + ", who hated it 😡"
  })
};

actionLibrary.getDiscouraged = {
  type: 'getDiscouraged',
  find: '?c1 ?n1 ?c2 ?n2 ?e1 ?e2 ?proj ?projtype',
  where: [
    // ?e1: ?c1 shows ?proj to ?c2, who hates it
    '?e1 "type" "showProject_hated"',
    '?e1 "actor" ?c1',
    '?e1 "project" ?proj',
    '?e1 "target" ?c2',
    // ?e2: ?c1 abandons ?proj
    '?e2 "type" "abandonProject"',
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
    target: vars.c1,
    project: vars.proj,
    effects: [
      {type: 'increaseProjectDrama', project: vars.proj, amount: 1}
    ],
    text: "🎨 " + vars.n1 + " considered restarting their abandoned " + vars.projtype +
          " project, but then remembered " + vars.n2 + "'s negative remarks and decided to leave it alone."
  })
}

actionLibrary.plantTree = {
  type: 'plantTree',
  find: '?c1 ?n1',
  where: [
    '?c1 "name" ?n1'
  ],
  event: (vars) => ({
    actor: vars.c1,
    target:vars.c1,
    effects: [
      {type: 'addAttitude', charge: 'positive', source: vars.c1, target: vars.c1}
    ],
    text: "🌳 " + vars.n1 + " planted a tree " + randNth(['near their house.', 'at the park.', 'in their backyard.'])
  })
};

actionLibrary.realizeLove = {
  type: 'realizeLove',
  find: '?c1 ?n1 ?c2 ?n2 ?affection',
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
    text: "💓 " + vars.n1 + " is in love with " + vars.n2+"."
  })
};

actionLibrary.askOut = {
  type: 'askOut',
  find: '?c1 ?n1 ?c2 ?n2 ?affection ?c2romanceTarget',
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
          {type: 'beginDating', char1:vars.c1, char2: vars.c2}
          /*
          {type: 'addAttitude', charge: 'positive', source: vars.c1, target: vars.c2},
          {type: 'addAttitude', charge: 'positive', source: vars.c2, target: vars.c1},
          {type: 'realizedLove', affection:vars.affection, romeo:vars.c1, juliet:vars.c2},
          {type: 'changeAffectionLevel', affection:vars.affection, amount:1},
          */
        ],
        text: "💞 " + vars.n1 + " is now in a relationship with " + vars.n2+"."
      }
    } else {
      return {
        actor: vars.c1,
        target: vars.c2,
        effects: [
          {type: 'addAttitude', charge: 'negative', source: vars.c1, target: vars.c2},
          {type: 'changeAffectionLevel', affection:vars.affection, amount:-2}
        ],
        text: "💔 " + vars.n1 + " was brutally rejected by " + vars.n2+"."
      }
    }
  } 
};

let allActions = Object.values(actionLibrary);
allActions.forEach(preprocessAction);
