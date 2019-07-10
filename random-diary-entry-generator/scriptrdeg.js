var raw_grammar = 
	{
	"name": 
		["Cheri","Fox","Morgana","Jedoo","Brick","Shadow","Krox","Urga","Zelph"]
,	"story": 
		["#hero.capitalize# was a great #occupation#, and this song tells of #heroTheir# adventure. #hero.capitalize# #didStuff#, then #heroThey# #didStuff#, then #heroThey# went home to read a book."]
,	"monster": 
		["dragon","ogre","witch","wizard","goblin","golem","giant","sphinx","warlord"]
,	"setPronouns": 
		["[heroThey:they][heroThem:them][heroTheir:their][heroTheirs:theirs]","[heroThey:she][heroThem:her][heroTheir:her][heroTheirs:hers]","[heroThey:he][heroThem:him][heroTheir:his][heroTheirs:his]"]
,	"setOccupation": 
		["[occupation:baker][didStuff:baked bread,decorated cupcakes,folded dough,made croissants,iced a cake]","[occupation:warrior][didStuff:fought #monster.a#,saved a village from #monster.a#,battled #monster.a#,defeated #monster.a#]"]
,	"origin": 
		["#[#setPronouns#][#setOccupation#][hero:#name#]story#"]
}

var grammar = tracery.createGrammar( raw_grammar );
console.log (grammar);
grammar.addModifiers(baseEngModifiers);

var flattened = grammar.flatten("#origin#");
console.log("flattened:", flattened)

let connectors = ["then","to","but"];

let actions = ["went home",
	"went on a holiday", "went on a day trip", "went on vacation",
	"went on a journey", "had an adventure",
	"went out for food", "went out to dinner", "went out for drinks",
	"went shopping",
	"went to a meeting",
	"went to a class",
	"went to a party",
	"went to a sporting event",
	"went to the doctor", "went to the hospital",
	"a large weight of responsibility got dropped into my lap", "big responsibility is weighing on me",
	"avoided doing something", "avoided a responsibility",
	"chatted with a stranger",
	"chatted with someone",
	"collaborated with someone", "worked together with someone",
	"did nothing", "couldn't do anything",
	"daydreamed",
	"meditated",
	"did chores", "took care of personal business", "did adult things",
	"did hobby", "hobbied",
	"did something for someone", "helped someone", "did a favor for someone",
	"asked for help", "got help on something from someone",
	"exercised", "worked out",
	"feeling excited for something coming up",
	"felt sick", "felt bad",
	"finished some work",
	"interneted", "puttered around on the internet", "messed around on the internet", "played on the computer",
	"had a busy day", "had a full day",
	"had a good idea",
	"had a nice convo w/ someone",
	"heard from someone",
	"helped resolve a fight",
	"hung out",
	"hung out with people", "spent quality time with someone",
	"hurt myself",
	"made plans",
	"made something",
	"messed up", 
	"missed someone", "wished someone was here", 
	"moved",
	"went somewhere",
	"people said nice things about me", "felt recognized", "got recognition",
	"played games",
	"ran into someone",
	"reached a turning point in something",
	"reached out to someone",
	"read a book", "read something",
	"realized something",
	"saw something", "encountered something",
	"looked at art", "saw art", "experienced art",
	"learned something new", "set out to learn something new",
	"slept in",
	"someone got angry with me", "someone got upset with me",
	"someone did something cool",
	"someone and someone fought", "someone and someone got into a fight",
	"someone bothered me", "someone got on my nerves", "someone annoyed me",
	"someone was a jerk to me", "someone was bitchy at me", "someone yelled at me", "someone got angry at me",
	"studied", "studied for a thing coming up", "studied for a test coming up",
	"reminisced", "thought of an old memory", "thought of old times",
	"took a walk", "took a walk to nowhere in particular", "took a drive",
	"took care of someone",
	"treated myself",
	"cooked", "cooked something yummy",
	"had people over", "had someone over",
	"visited friends", "visited relatives"];

let actions2 = ["went home",
	"went on a holiday", "went on a day trip", "went on vacation",
	"went on a journey", "had an adventure",
	"went out for food", "went out to dinner", "went out for drinks",
	"went shopping",
	"went to a meeting",
	"went to a class",
	"went to a party",
	"went to a sporting event",
	"went to the doctor", "went to the hospital",
	"a large weight of responsibility got dropped into my lap", "big responsibility is weighing on me",
	"avoided doing something", "avoided a responsibility",
	"chatted with a stranger",
	"chatted with someone",
	"collaborated with someone", "worked together with someone",
	"did nothing", "couldn't do anything",
	"daydreamed",
	"meditated",
	"did chores", "took care of personal business", "did adult things",
	"did hobby", "hobbied",
	"did something for someone", "helped someone", "did a favor for someone",
	"asked for help", "got help on something from someone",
	"exercised", "worked out",
	"feeling excited for something coming up",
	"felt sick", "felt bad",
	"finished some work",
	"interneted", "puttered around on the internet", "messed around on the internet", "played on the computer",
	"had a busy day", "had a full day",
	"had a good idea",
	"had a nice convo w/ someone",
	"heard from someone",
	"helped resolve a fight",
	"hung out",
	"hung out with people", "spent quality time with someone",
	"hurt myself",
	"made plans",
	"made something",
	"messed up", 
	"missed someone", "wished someone was here",
	"moved",
	"went somewhere",
	"people said nice things about me", "felt recognized", "got recognition",
	"played games",
	"ran into someone",
	"reached a turning point in something",
	"reached out to someone",
	"read a book", "read something",
	"realized something",
	"saw something", "encountered something",
	"looked at art", "saw art", "experienced art",
	"learned something new", "set out to learn something new",
	"slept in",
	"someone got angry with me", "someone got upset with me",
	"someone did something cool",
	"someone and someone fought", "someone and someone got into a fight",
	"someone bothered me", "someone got on my nerves", "someone annoyed me",
	"someone was a jerk to me", "someone was bitchy at me", "someone yelled at me", "someone got angry at me",
	"studied", "studied for a thing coming up", "studied for a test coming up",
	"reminisced", "thought of an old memory", "thought of old times",
	"took a walk", "took a walk to nowhere in particular", "took a drive",
	"took care of someone",
	"treated myself",
	"cooked", "cooked something yummy",
	"had people over", "had someone over",
	"visited friends", "visited relatives"];

let becauseevents = ["someone got angry with me", "someone got upset with me",
	"someone did something cool",
	"someone and someone fought", "someone and someone got into a fight",
	"someone bothered me", "someone got on my nerves", "someone annoyed me",
	"someone was a jerk to me", "someone was bitchy at me", "someone yelled at me", "someone got angry at me"]

let becauseactions = ["went home",
	"went on a holiday", "went on a day trip", "went on vacation",
	"went on a journey", "had an adventure",
	"went out for food", "went out to dinner", "went out for drinks",
	"went shopping",
	"went to a meeting",
	"went to a class",
	"went to a party",
	"went to a sporting event",
	"went to the doctor", "went to the hospital",
	"a large weight of responsibility got dropped into my lap", "big responsibility is weighing on me",
	"avoided doing something", "avoided a responsibility",
	"chatted with a stranger",
	"chatted with someone",
	"collaborated with someone", "worked together with someone",
	"did nothing", "couldn't do anything",
	"daydreamed",
	"meditated",
	"did chores", "took care of personal business", "did adult things",
	"did hobby", "hobbied",
	"did something for someone", "helped someone", "did a favor for someone",
	"asked for help", "got help on something from someone",
	"exercised", "worked out",
	"feeling excited for something coming up",
	"felt sick", "felt bad",
	"finished some work",
	"interneted", "puttered around on the internet", "messed around on the internet", "played on the computer",
	"had a busy day", "had a full day",
	"had a good idea",
	"had a nice convo w/ someone",
	"heard from someone",
	"helped resolve a fight",
	"hung out",
	"hung out with people", "spent quality time with someone",
	"hurt myself",
	"made plans",
	"made something",
	"messed up", 
	"missed someone", "wished someone was here",
	"moved",
	"went somewhere",
	"people said nice things about me", "felt recognized", "got recognition",
	"played games",
	"ran into someone",
	"reached a turning point in something",
	"reached out to someone",
	"read a book", "read something",
	"realized something",
	"saw something", "encountered something",
	"looked at art", "saw art", "experienced art",
	"learned something new", "set out to learn something new",
	"slept in",
	"studied", "studied for a thing coming up", "studied for a test coming up",
	"reminisced", "thought of an old memory", "thought of old times",
	"took a walk", "took a walk to nowhere in particular", "took a drive",
	"took care of someone",
	"treated myself",
	"cooked", "cooked something yummy",
	"had people over", "had someone over",
	"visited friends", "visited relatives"];

let events = ["a power outage somewhere", "a storm", "making plans"]

let connectors2 = ["at","near","on the way to","by"];

let connectors3 = ["with", "for"];

let connectors4 = ["as usual", "again"];

let gerundForms = {
	'was': 'being',
	'went': 'going',
	'had': 'having',
	'did': 'doing',
	'got': 'getting',
	'saw': 'seeing',
	'made': 'making',
	'took': 'taking',
	'read': 'reading',
	'thought': 'thinking',
	'slept': 'sleeping',
	'got': 'getting'
}

function convertPastTenseToGerund(pastTense){
	return pastTense.replace(/ed$/, 'ing');
}

function actionTextToGerundForm(actionText){
	let words = actionText.split(' ');
	let verb = words [0];
	let gerundForm = gerundForms[verb];
	if (!gerundForm){
		gerundForm = convertPastTenseToGerund(verb);
	}
	let finalText = gerundForm + ' ';
	for (let i = 1; i < words.length; i++){
		finalText += words[i] + ' ';
	}
	finalText = finalText.trim();
	return finalText;
}

let presentForms = {
	'hung': 'hang',
	'had': 'have',
	'did': 'do',
	'realized': 'realize',
	'got': 'getting',
	'went': 'go',
	'helped': 'help',
	'hobbied': 'hobbying',
	'collaborated': 'collaborate',
	'reminisced': 'reminisce'
}

function convertPastTenseToPresent(pastTense){
	return pastTense.replace(/ed$/, '');
}

function actionTextToPresentForm(actionText){
	let words = actionText.split(' ');
	let verb = words [0];
	let presentForm = presentForms[verb];
	if (!presentForm){
		presentForm = convertPastTenseToPresent(verb);
	}
	let finalText = presentForm + ' ';
	for (let i = 1; i < words.length; i++){
		finalText += words[i] + ' ';
	}
	finalText = finalText.trim();
	return finalText;
}

//state the function
function randomItem(items){
	return items[Math.floor(Math.random()*items.length)];
}

//if button is not clicked, this function below will happen
	let mybutton = document.getElementById('mybutton');
	mybutton.onclick = function(){
		//function body
			let action = randomItem(actions);
			let action2 = randomItem(actions2);
			while(action===action2){
				action2 = randomItem(actions2);
			}
			let connector = randomItem(connectors);
			let connector2 = randomItem(connectors2);
			let connector3 = randomItem(connectors3);
			let connector4 = randomItem(connectors4);
			let becauseevent = randomItem(becauseevents);
			let becauseaction = randomItem(becauseactions);
			let event = randomItem(events);
			let sentenceformats = [action + " " + connector + " " + action2, action + " " + connector3 + " " + "(some character)", 
			action + " " + connector2 + " " + "(some place)", action + " " + connector4, action + " while " + actionTextToGerundForm(action2), 
			action + " which led to " + actionTextToGerundForm(action2), action + " to " + actionTextToPresentForm(action2), 
			action + " which caused " + event, action + " because " + becauseevent, action + " because I " + becauseaction];
			//myoutput.innerText = randomItem(sentenceformats); 
	};

	function createRandomEvent(){
		let action = randomItem(actions);
			let action2 = randomItem(actions2);
			while(action===action2){
				action2 = randomItem(actions2);
			}
			let connector = randomItem(connectors);
			let connector2 = randomItem(connectors2);
			let connector3 = randomItem(connectors3);
			let connector4 = randomItem(connectors4);
			let becauseevent = randomItem(becauseevents);
			let becauseaction = randomItem(becauseactions);
			let event = randomItem(events);
			let sentenceformats = [action + " " + connector + " " + action2, action + " " + connector3 + " " + "(some character)", 
			action + " " + connector2 + " " + "(some place)", action + " " + connector4, action + " while " + actionTextToGerundForm(action2), 
			action + " which led to " + actionTextToGerundForm(action2), action + " to " + actionTextToPresentForm(action2), 
			action + " which caused " + event, action + " because " + becauseevent, action + " because I " + becauseaction];
	let randomEvent = randomItem(sentenceformats);
	return randomEvent;
}

mybutton.onclick = function(){
	myoutput.innerText = ' ';
	for (let i=0; i < 10; i++){
		myoutput.innerText += createRandomEvent() + '\n';
	}
}
