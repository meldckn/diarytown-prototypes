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

actionLibrary.getPet = {
  type: 'getPet',
  find: '?c1 ?n1',
  where: ['?c1 "name" ?n1'],
  event: (vars) => ({
    actor: vars.c1,
      target: vars.c1,
       effects: [
       {type: 'changeAttitudeTowardSelf', amount: 1, target: vars.c1}
       ],
      text: "🐶 "+ vars.n1 + " got a new pet "
  })
};

actionLibrary.upstagedMyEnemy = {
  type: 'upstagedMyEnemy',
  find: '?c1 ?n1',
  where: ['?c1 "name" ?n1'],
  event: (vars) => ({
    actor: vars.c1,
      target: vars.c1,
       effects: [
       {type: 'changeAttitudeTowardSelf', amount: 1, target: vars.c1}
       ],
      text: "😤 "+ vars.n1 + " upstaged their enemy. "
  })
};

actionLibrary.wasUpstagedMyEnemy = {
  type: 'wasUpstagedMyEnemy',
  find: '?c1 ?n1',
  where: ['?c1 "name" ?n1'],
  event: (vars) => ({
    actor: vars.c1,
      target: vars.c1,
       effects: [
       {type: 'changeAttitudeTowardSelf', amount: -1, target: vars.c1}
       ],
      text: "😤 " + vars.n1 + " was upstaged by their enemy. "
  })
};

actionLibrary.didWellOnTest = {
  type: 'didWellOnTest',
  find: '?c1 ?n1',
  where: ['?c1 "name" ?n1'],
  event: (vars) => ({
    actor: vars.c1,
      target: vars.c1,
       effects: [
       {type: 'changeAttitudeTowardSelf', amount: 1, target: vars.c1}
       ],
      text: "💯 "+vars.n1 + " did well on a test. "
  })
};

actionLibrary.didPoorlyOnTest = {
  type: 'didPoorlyOnTest',
  find: '?c1 ?n1',
  where: ['?c1 "name" ?n1'],
  event: (vars) => ({
    actor: vars.c1,
      target: vars.c1,
       effects: [
       {type: 'changeAttitudeTowardSelf', amount: -1, target: vars.c1}
       ],
      text: "☹️ "+vars.n1 + " did poorly on a test. "
  })
};

actionLibrary.gotTheJob = {
  type: 'gotTheJob',
  find: '?c1 ?n1',
  where: ['?c1 "name" ?n1'],
  event: (vars) => ({
    actor: vars.c1,
      target: vars.c1,
       effects: [
       {type: 'changeAttitudeTowardSelf', amount: 1, target: vars.c1}
       ],
      text: "💼 "+vars.n1 + " got a job. "
  })
};

actionLibrary.didNotGetTheJob = {
  type: 'didNotGetTheJob',
  find: '?c1 ?n1',
  where: ['?c1 "name" ?n1'],
  event: (vars) => ({
    actor: vars.c1,
      target: vars.c1,
       effects: [
       {type: 'changeAttitudeTowardSelf', amount: -1, target: vars.c1}
       ],
      text: "🚫💼 "+vars.n1 + " did not get a job. "
  })
};

actionLibrary.hadAJobInterview = {
  type: 'hadAJobInterview',
  find: '?c1 ?n1',
  where: ['?c1 "name" ?n1'],
  event: (vars) => ({
    actor: vars.c1,
      target: vars.c1,
        effects: [],
      text: "💼 "+vars.n1 + " had an interview. "
  })
};

actionLibrary.firedFromJob = {
  type: 'firedFromJob',
  find: '?c1 ?n1',
  where: ['?c1 "name" ?n1'],
  event: (vars) => ({
    actor: vars.c1,
      target: vars.c1,
       effects: [
       {type: 'changeAttitudeTowardSelf', amount: -1, target: vars.c1}
       ],
      text: "🔥 "+vars.n1 + " was fired from their job. "
  })
};

actionLibrary.lostWeight = {
  type: 'lostWeight',
  find: '?c1 ?n1',
  where: ['?c1 "name" ?n1'],
  event: (vars) => ({
    actor: vars.c1,
      target: vars.c1,
       effects: [
       {type: 'changeAttitudeTowardSelf', amount: 1, target: vars.c1}
       ],
      text: "🥗 "+vars.n1 + " lost weight. "
  })
};

actionLibrary.danced = {
  type: 'danced',
  find: '?c1 ?n1',
  where: ['?c1 "name" ?n1'],
  event: (vars) => ({
    actor: vars.c1,
      target: vars.c1,
       effects: [
       {type: 'changeAttitudeTowardSelf', amount: 1, target: vars.c1}
       ],
      text: "💃 "+vars.n1 + " danced. "
  })
};

actionLibrary.feltHappy = {
  type: 'feltHappy',
  find: '?c1 ?n1',
  where: ['?c1 "name" ?n1'],
  event: (vars) => ({
    actor: vars.c1,
      target: vars.c1,
       effects: [
       {type: 'changeAttitudeTowardSelf', amount: 1, target: vars.c1}
       ],
      text: "😃 "+vars.n1 + " felt happy. "
  })
};

actionLibrary.feltSad = {
  type: 'feltSad',
  find: '?c1 ?n1',
  where: ['?c1 "name" ?n1'],
  event: (vars) => ({
    actor: vars.c1,
      target: vars.c1,
       effects: [
       {type: 'changeAttitudeTowardSelf', amount: -1, target: vars.c1}
       ],
      text: "😢 "+vars.n1 + " felt sad. "
  })
};

actionLibrary.gotDrunk = {
  type: 'gotDrunk',
  find: '?c1 ?n1',
  where: ['?c1 "name" ?n1'],
  event: (vars) => ({
    actor: vars.c1,
      target: vars.c1,
       effects: [
       {type: 'changeAttitudeTowardSelf', amount: randNth([-1, 1]), target: vars.c1}
       ],
      text: "🍷 "+vars.n1 + " got drunk. "
  })
};

actionLibrary.meditated = {
  type: 'meditated',
  find: '?c1 ?n1',
  where: ['?c1 "name" ?n1'],
  event: (vars) => ({
    actor: vars.c1,
      target: vars.c1,
       effects: [
       {type: 'changeAttitudeTowardSelf', amount: 1, target: vars.c1}
       ],
      text: "🧘 "+vars.n1 + " meditated. "
  })
};

actionLibrary.didChores = {
  type: 'didChores',
  find: '?c1 ?n1',
  where: ['?c1 "name" ?n1'],
  event: (vars) => ({
    actor: vars.c1,
      target: vars.c1,
       effects: [
       {type: 'changeAttitudeTowardSelf', amount: 1, target: vars.c1}
       ],
      text: "🏠 "+vars.n1 + " did chores. "
  })
};

actionLibrary.daydreamed = {
  type: 'daydreamed',
  find: '?c1 ?n1',
  where: ['?c1 "name" ?n1'],
  event: (vars) => ({
    actor: vars.c1,
      target: vars.c1,
       effects: [
       {type: 'changeAttitudeTowardSelf', amount: 0, target: vars.c1}
       ],
      text: "💭 "+vars.n1 + " daydreamed. "
  })
};

actionLibrary.movedHouses = {
  type: 'movedHouses',
  find: '?c1 ?n1',
  where: ['?c1 "name" ?n1'],
  event: (vars) => ({
    actor: vars.c1,
      target: vars.c1,
       effects: [
       {type: 'changeAttitudeTowardSelf', amount: 1, target: vars.c1}
       ],
      text: "🏠 "+vars.n1 + " moved houses. "
  })
};

actionLibrary.readBook = {
  type: 'readBook',
  find: '?c1 ?n1',
  where: ['?c1 "name" ?n1'],
  event: (vars) => ({
    actor: vars.c1,
      target: vars.c1,
       effects: [
       {type: 'changeAttitudeTowardSelf', amount: 1, target: vars.c1}
       ],
      text: "📖 "+vars.n1 + " read a book. "
  })
};

actionLibrary.lookedAtArt = {
  type: 'lookedAtArt',
  find: '?c1 ?n1',
  where: ['?c1 "name" ?n1'],
  event: (vars) => ({
    actor: vars.c1,
      target: vars.c1,
       effects: [
       {type: 'changeAttitudeTowardSelf', amount: 1, target: vars.c1}
       ],
      text: "🖼 "+vars.n1 + " looked at art. "
  })
};

actionLibrary.studied = {
  type: 'studied',
  find: '?c1 ?n1',
  where: ['?c1 "name" ?n1'],
  event: (vars) => ({
    actor: vars.c1,
      target: vars.c1,
       effects: [
       {type: 'changeAttitudeTowardSelf', amount: 1, target: vars.c1}
       ],
      text: "📖 "+vars.n1 + " studied. "
  })
};

actionLibrary.tookAWalk = {
  type: 'tookAWalk',
  find: '?c1 ?n1',
  where: ['?c1 "name" ?n1'],
  event: (vars) => ({
    actor: vars.c1,
      target: vars.c1,
       effects: [
       {type: 'changeAttitudeTowardSelf', amount: 1, target: vars.c1}
       ],
      text: "🚶 "+vars.n1 + " took a walk. "
  })
};

actionLibrary.stormed = {
  type: 'stormed',
  find: '?c1 ?n1',
  where: ['?c1 "name" ?n1'],
  event: (vars) => ({
    actor: vars.c1,
      target: vars.c1,
       effects: [
       {type: 'changeAttitudeTowardSelf', amount: 0, target: vars.c1}
       ],
      text: "🌩 It stormed. "
  })
};

actionLibrary.waitedInTraffic = {
  type: 'waitedInTraffic',
  find: '?c1 ?n1',
  where: ['?c1 "name" ?n1'],
  event: (vars) => ({
    actor: vars.c1,
      target: vars.c1,
       effects: [
       {type: 'changeAttitudeTowardSelf', amount: -1, target: vars.c1}
       ],
      text: "🚦 "+vars.n1 + " waited in traffic. "
  })
};

actionLibrary.goSwimming = {
  type: 'goSwimming',
  find: '?c1 ?n1',
  where: [
    '?c1 "name" ?n1'
  ],
  event: (vars) => ({
    target:vars.c1,
    effects: [
      {type: 'changeAttitudeTowardSelf', target: vars.c1, amount: 1}
    ],
    text: "🏊 " + vars.n1 + " went swimming. " 
  })
};

actionLibrary.goDriving = {
	type: 'goDriving',
	find: '?c1 ?n1',
	where: [
		'?c1 "name" ?n1'
	],
	event: (vars) => ({
		target: vars.c1,
		effects: [
			{type: 'changeAttitudeTowardSelf', target: vars.c1, amount: 1}
		],
		text: "🚗 " + vars.n1 + " went on a drive. "
	})
}; 

actionLibrary.goRunning = {
	type: 'goRunning',
	find: '?c1 ?n1',
	where: [
		'?c1 "name" ?n1'
	],
	event: (vars) => ({
		target: vars.c1,
		effects: [
			{type: 'changeAttitudeTowardSelf', target: vars.c1, amount: 1}
		],
		text: "🏃 " + vars.n1 + " went on a run. "
	})
};

actionLibrary.goOnDateWith = {
  type: 'goOnDateWith',
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
      {type: 'changeAffectionLevel', affection:vars.a1, amount: randNth(-1, 1, 2)},
      {type: 'changeAffectionLevel', affection:vars.a2, amount: randNth(-1, 1, 2)}
    ],
    text: "😘 " + vars.n1 + " and " + vars.n2 +
          " went on a date at " + randNth(['the boba shop.','the movies.','italian restaurant.'])
  })
};

actionLibrary.goOutWith = {
  type: 'goOutWith',
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
      {type: 'changeAffectionLevel', affection:vars.a1, amount: +1},
      {type: 'changeAffectionLevel', affection:vars.a2, amount: +1}
    ],
    text: "🤪 " + vars.n1 + randNth([' ate out ',' went on a picnic ', 
	    	' went hiking ', ' went camping ', ' went to the zoo ', ' shopped ', ' went on vacation ' ]) + "with " + vars.n2 + '.'
 })
};

actionLibrary.goOnDateWith = {
  type: 'goOnDateWith',
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
      {type: 'changeAffectionLevel', affection:vars.a1, amount: randNth(-1, 1, 2)},
      {type: 'changeAffectionLevel', affection:vars.a2, amount: randNth(-1, 1, 2)},
    ],
    text: "😘 " + vars.n1 + " went on a date with " + vars.n2 + '.'
 })
};

actionLibrary.wentToSchool = {
  type: 'wentToSchool',
  find: '?c1 ?n1',
  where: [
    '?c1 "name" ?n1'
  ],
  event: (vars) => ({
    target: vars.c1,
    effects: [],
    text: "🏫 " + vars.n1 + " went to school. " 
  })
};


actionLibrary.pickedFlower = {
  type: 'pickedFlower',
  find: '?c1 ?n1',
  where: [
    '?c1 "name" ?n1'
  ],
  event: (vars) => ({
    target: vars.c1,
    effects: [],
    text: "🌺 " + vars.n1 + " picked a flower. " 
  })
};

actionLibrary.didNothing = {
	type: 'didNothing',
	find: '?c1 ?n1',
	where: [
		'?c1 "name" ?n1'
	],
	event: (vars) => ({
		target: vars.c1,
		effects: [
			{type: 'changeAttitudeTowardSelf', target: vars.c1, amount: -1}
		],
		text: "😒 " + vars.n1 + " was unproductive. "
	})
};

actionLibrary.gotSick = {
	type: 'gotSick',
	find: '?c1 ?n1',
	where: [
		'?c1 "name" ?n1'
	],
	event: (vars) => ({
		target: vars.c1,
		effects: [
			{type: 'changeAttitudeTowardSelf', target: vars.c1, amount: -1}
		],
		text: "🤢 " + vars.n1 + " got sick. "
	})
};

actionLibrary.madeAnEnemy = {
  type: 'madeAnEnemy',
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
      {type: 'changeAffectionLevel', affection:vars.a1, amount: -1},
      {type: 'changeAffectionLevel', affection:vars.a2, amount: -1}
    ],
    text: "😡 " + vars.n1 + " and " + vars.n2 + " are now enemies. "
  })
};

actionLibrary.wentToWork = {
	type: 'wentToWork',
	find: '?c1 ?n1',
	where: [
		'?c1 "name" ?n1'
	],
	event: (vars) => ({
		target: vars.c1,
		effects: [
			{type: 'changeAttitudeTowardSelf', target: vars.c1, amount: +1}
		],
		text: "👔 " + vars.n1 + " went to work. "
	})
};

actionLibrary.wentToClass = {
	type: 'wentToClass',
	find: '?c1 ?n1',
	where: [
		'?c1 "name" ?n1'
	],
	event: (vars) => ({
		target: vars.c1,
		effects: [
			{type: 'changeAttitudeTowardSelf', target: vars.c1, amount: +1}
		],
		text: "📝 " + vars.n1 + " went to a class. "
	})
};

actionLibrary.getIntoFight = {
  type: 'getIntoFight',
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
      {type: 'changeAffectionLevel', affection:vars.a1, amount: -1},
      {type: 'changeAffectionLevel', affection:vars.a2, amount: -1}
    ],
    text: "😔 " + vars.n1 + " and " + vars.n2 + " got into a fight. "
 })
};


actionLibrary.chattedWithAStranger = {
  type: 'chattedWithAStranger',
  find: '?c1 ?n1',
  where: [
    '?c1 "name" ?n1'
  ],
  event: (vars) => ({
    target: vars.c1,
    effects: [
      {type: 'changePopularity', target: vars.c1, amount: +1}
    ],
    text: "👥 " + vars.n1 + " chatted with a stranger. "
  })
};

let allActions = Object.values(actionLibrary);
allActions.forEach(preprocessAction);
