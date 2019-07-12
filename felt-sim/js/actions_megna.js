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
       {type: 'changePopularity', target: vars.c1, amount: +1}
       {type: 'changePopularity', target: vars.c1, amount: +1}
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

actionLibrary.wentToDoctor_good= {
  type: 'wentToDoctor_good',
  find: '?c1 ?n1',
  where: [
    '?c1 "name" ?n1',
  ],
  event: (vars) => ({
    actor: vars.c1,
    effects: [
      {type: 'changeAttitudeTowardSelf', target: vars.c1, amount: 1},
    ],
    text: "🏥 " + vars.n1 + "'s doctor appointment went well! "
  })
};

actionLibrary.wentToDoctor_neutral= {
  type: 'wentToDoctor_neutral',
  find: '?c1 ?n1',
  where: [
    '?c1 "name" ?n1',
  ],
  event: (vars) => ({
    actor: vars.c1,
    effects: [],
    text: "🏥 " + vars.n1 + "'s doctor appointment went normal. "
  })
};


actionLibrary.wentToDoctor_bad= {
  type: 'wentToDoctor_bad',
  find: '?c1 ?n1',
  where: [
    '?c1 "name" ?n1',
  ],
  event: (vars) => ({
    actor: vars.c1,
    effects: [
      {type: 'changeAttitudeTowardSelf', target: vars.c1, amount: -1},
    ],
    text: "🏥 " + vars.n1 + "'s doctor appointment went bad. "
  })
};

actionLibrary.surfedInternet_good= {
  type: 'surfedInternet_good',
  find: '?c1 ?n1',
  where: [
    '?c1 "name" ?n1',
  ],
  event: (vars) => ({
    actor: vars.c1,
    effects: [
      {type: 'changeAttitudeTowardSelf', target: vars.c1, amount: 1},
    ],
    text: "💻 " + vars.n1 + " had fun surfing the internet! "
  })
};

actionLibrary.surfedInternet_neutral= {
  type: 'surfedInternet_neutral',
  find: '?c1 ?n1',
  where: [
    '?c1 "name" ?n1',
  ],
  event: (vars) => ({
    actor: vars.c1,
    effects: [],
    text: "💻 " + vars.n1 + " felt meh after surfing the internet. "
  })
};


actionLibrary.surfedInternet_bad = {
  type: 'surfedInternet_bad',
  find: '?c1 ?n1',
  where: [
    '?c1 "name" ?n1',
  ],
  event: (vars) => ({
    actor: vars.c1,
    effects: [
      {type: 'changeAttitudeTowardSelf', target: vars.c1, amount: -1},
    ],
    text: "💻 " + vars.n1 + " felt bad after spending time on the internet. "
  })
};

actionLibrary.playedVideoGames_good= {
  type: 'playedVideoGames_good',
  find: '?c1 ?n1',
  where: [
    '?c1 "name" ?n1',
  ],
  event: (vars) => ({
    actor: vars.c1,
    effects: [
      {type: 'changeAttitudeTowardSelf', target: vars.c1, amount: 1},
    ],
    text: "🎮 " + vars.n1 + " had fun playing video games! "
  })
};

actionLibrary.playedVideoGames_neutral= {
  type: 'playedVideoGames_neutral',
  find: '?c1 ?n1',
  where: [
    '?c1 "name" ?n1',
  ],
  event: (vars) => ({
    actor: vars.c1,
    effects: [],
    text: "🎮 " + vars.n1 + " felt meh after playing video games. "
  })
};


actionLibrary.playedVideoGames_bad = {
  type: 'playedVideoGames_bad',
  find: '?c1 ?n1',
  where: [
    '?c1 "name" ?n1',
  ],
  event: (vars) => ({
    actor: vars.c1,
    effects: [
      {type: 'changeAttitudeTowardSelf', target: vars.c1, amount: -1},
    ],
    text: "🎮 " + vars.n1 + " felt bad after playing video games. "
  })
};

actionLibrary.bingeWatchedTV_good= {
  type: 'bingeWatchedTV_good',
  find: '?c1 ?n1',
  where: [
    '?c1 "name" ?n1',
  ],
  event: (vars) => ({
    actor: vars.c1,
    effects: [
      {type: 'changeAttitudeTowardSelf', target: vars.c1, amount: 1},
    ],
    text: "📺 " + vars.n1 + " had fun binge-watching TV! "
  })
};

actionLibrary.bingeWatchedTV_neutral= {
  type: 'bingeWatchedTV_neutral',
  find: '?c1 ?n1',
  where: [
    '?c1 "name" ?n1',
  ],
  event: (vars) => ({
    actor: vars.c1,
    effects: [],
    text: "📺 " + vars.n1 + " felt meh after binge-watching TV. "
  })
};


actionLibrary.bingeWatchedTV_bad = {
  type: 'bingeWatchedTV_bad',
  find: '?c1 ?n1',
  where: [
    '?c1 "name" ?n1',
  ],
  event: (vars) => ({
    actor: vars.c1,
    effects: [
      {type: 'changeAttitudeTowardSelf', target: vars.c1, amount: -1},
    ],
    text: "📺 " + vars.n1 + " felt bad after binge-watching TV. "
  })
};