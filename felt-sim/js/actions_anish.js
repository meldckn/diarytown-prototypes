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
    	text: "🐶 "+ vars.n1 + " got a new pet. "
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
   		 effects: [
   		 {type: 'changeAttitudeTowardSelf', amount: 0, target: vars.c1}
   		 ],
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

actionLibrary.chattedWithAStranger = {
	type: 'chattedWithAStranger',
	find: '?c1 ?n1',
	where: ['?c1 "name" ?n1'],
	event: (vars) => ({
		actor: vars.c1,
    	target: vars.c1,
   		 effects: [
   		 {type: 'changePopularity', amount: 1, target: vars.c1}
   		 ],
    	text: "👥 "+vars.n1 + " chatted with a stranger. "
	})
};

actionLibrary.wentToAParty = {
	type: 'wentToAParty',
	find: '?c1 ?n1',
	where: ['?c1 "name" ?n1'],
	event: (vars) => ({
		actor: vars.c1,
    	target: vars.c1,
   		 effects: [
   		 {type: 'changePopularity', amount: 1, target: vars.c1}
   		 ],
    	text: "🎉 "+vars.n1 + " went to a party. "
	})
};

actionLibrary.wentToASportsGame = {
	type: 'wentToASportsGame',
	find: '?c1 ?n1',
	where: ['?c1 "name" ?n1'],
	event: (vars) => ({
		actor: vars.c1,
    	target: vars.c1,
   		 effects: [
   		 {type: 'changePopularity', amount: 1, target: vars.c1}
   		 ],
    	text: "🏀 "+vars.n1 + " went to a sports game. "
	})
};

actionLibrary.exercise = {
	type: 'exercise',
	find: '?c1 ?n1',
	where: ['?c1 "name" ?n1'],
	event: (vars) => ({
		actor: vars.c1,
    	target: vars.c1,
   		 effects: [   		 {type: 'changeAffectionLevel', amount:1, target:vars.c1}
   		 ],
    	text: "💪 "+vars.n1 + " exercised. "
	})
};

actionLibrary.wentToTheGym = {
	type: 'wentToTheGym',
	find: '?c1 ?n1',
	where: ['?c1 "name" ?n1'],
	event: (vars) => ({
		actor: vars.c1,
    	target: vars.c1,
   		 effects: [
   	
   		 {type: 'changeAffectionLevel', amount:1, target:vars.c1}
   		 ],
    	text: "🏋 "+vars.n1 + " went to the gym. "
	})
};