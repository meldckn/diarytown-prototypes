
actionLibrary.performed_good= {
  type: 'performed_good',
  find: '?c1 ?n1',
  where: [
    '?c1 "name" ?n1',
  ],
  event: (vars) => ({
    actor: vars.c1,
    target: vars.c1, 
    effects: [
      {type: 'changeAttitudeTowardSelf', target: vars.c1, amount: 1},
    ],
    text: "🎭 " + vars.n1 + " felt great after performing in front of an audience! "
  })
};

actionLibrary.performed_neutral= {
  type: 'performed_neutral',
  find: '?c1 ?n1',
  where: [
    '?c1 "name" ?n1',
  ],
  event: (vars) => ({
    actor: vars.c1,
    target: vars.c1, 
    effects: [],
    text: "🎭 " + vars.n1 + " felt meh after their performance in front of an audience. "
  })
};


actionLibrary.performed_bad= {
  type: 'performed_bad',
  find: '?c1 ?n1',
  where: [
    '?c1 "name" ?n1',
  ],
  event: (vars) => ({
    actor: vars.c1,
    target: vars.c1, 
    effects: [
      {type: 'changeAttitudeTowardSelf', target: vars.c1, amount: -1},
    ],
    text: "🎭 " + vars.n1 + " felt bad after their performance in front of an audience. "
  })
};

actionLibrary.chattedWithSomeone = {
  type: 'chattedWithSomeone',
  find: '?c1 ?n1 ?c2 ?n2',
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
      {type: 'changePopularity', target: vars.c1, amount: +1}
      {type: 'changePopularity', target: vars.c2, amount: +1}
    ],
    text: "🧑‍🤝‍🧑 " + vars.n1 + " and " + vars.n2 + " chatted with each other. "
  })
};

actionLibrary.workedWithSomeone = {
  type: 'workedWithSomeone',
  find: '?c1 ?n1 ?c2 ?n2',
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
      {type: 'changePopularity', target: vars.c1, amount: +1}
      {type: 'changePopularity', target: vars.c2, amount: +1}
    ],
    text: "🧑‍🤝‍🧑 " + vars.n1 + " and " + vars.n2 + " worked with each other. "
  })
};