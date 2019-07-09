/// ACTION DEFINITIONS

let betray = {
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
      {type: 'add_attitude', charge: 'negative', source: vars.c2, target: vars.c1}
    ],
    text: "🔪 Out of nowhere, " + vars.n2 + " betrayed " + vars.n1 + "!"
  })
};

let hangOutWith = {
  type: 'hangOutWith',
  find: '?c1 ?n1 ?c2 ?n2',
  where: [
    '?c1 "name" ?n1',
    '?c2 "name" ?n2',
    '(not= ?c1 ?c2)'
  ],
  event: (vars) => ({
    actor: vars.c1,
    target: vars.c2,
    effects: [
      {type: 'add_attitude', charge: 'positive', source: vars.c2, target: vars.c1},
      {type: 'add_attitude', charge: 'positive', source: vars.c1, target: vars.c2},
    ],
    text: "🍦 " + vars.n1 + " and " + vars.n2 +
          " hung out together at the " + randNth(['boba','ice cream','pizza']) + " place."
  })
};

let seeCuteAnimal = {
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

let startProject = {
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
        {type: 'start_project', owner: vars.c1, projectType: projectType}
      ],
      text: "🎨 " + vars.n1 + " started a new " + projectType + " project!"
    };
  }
};

let makeProgressOnProject = {
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
    effects: [],
    text: "🎨 " + vars.n1 + " made a lot of progress on their " + vars.projtype + " project."
  })
};

let workFruitlesslyOnProject = {
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
    effects: [],
    text: "🎨 " + vars.n1 + " tried to work on their " + vars.projtype + " project, but got nowhere."
  })
};

let abandonProject = {
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
      {type: 'update_project_state', project: vars.proj, newState: 'inactive'}
    ],
    text: "🎨 " + vars.n1 + " gave up on their " + vars.projtype + " project."
  })
};

let resumeProject = {
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
      {type: 'update_project_state', project: vars.proj, newState: 'active'}
    ],
    text: "🎨 " + vars.n1 + " started working on their " + vars.projtype + " project again!"
  })
};

let finishProject = {
  type: 'finishProject',
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
      {type: 'update_project_state', project: vars.proj, newState: 'finished'}
    ],
    text: "🎨 " + vars.n1 + " finished their " + vars.projtype + " project!"
  })
};

let showProject_loved = {
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
      {type: 'add_attitude', charge: 'positive', source: vars.c1, target: vars.c2}
    ],
    text: "🎨 " + vars.n1 + " showed their " + vars.projtype + " project to " + vars.n2 + ", who loved it ☺️"
  })
};

let showProject_neutral = {
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
    effects: [],
    text: "🎨 " + vars.n1 + " showed their " + vars.projtype + " project to " + vars.n2 +
          ", who was kinda meh about it 😐"
  })
};

let showProject_hated = {
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
      {type: 'add_attitude', charge: 'negative', source: vars.c2, target: vars.c1}
    ],
    text: "🎨 " + vars.n1 + " showed their " + vars.projtype + " project to " + vars.n2 + ", who hated it 😡"
  })
};

let getDiscouraged = {
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
    effects: [],
    text: "🎨 " + vars.n1 + " considered restarting their abandoned " + vars.projtype +
          " project, but then remembered " + vars.n2 + "'s negative remarks and decided to leave it alone."
  })
}

let allActions = [
  betray, hangOutWith, seeCuteAnimal,
  startProject, makeProgressOnProject, workFruitlesslyOnProject,
  abandonProject, resumeProject, finishProject,
  showProject_loved, showProject_neutral, showProject_hated,
  getDiscouraged
];
allActions.forEach(preprocessAction);
