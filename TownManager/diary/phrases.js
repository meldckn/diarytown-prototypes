var phrases = [ 
	{
		id : "used-quality",
		text : [ "used some quality of self" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "late",
		text : [ "was late to something", "#action and was late" ],
		type : "action",
		category : "self",
		otherCategories : "negative",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "was-adj",
		text : [ "was #adj", "did something #adj", "felt #adj" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "was-adj-to",
		text : [ "was #adj to #someone" ],
		type : "action",
		category : "social",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "watched",
		text : [ "watched TV", "watched a show", "watched a movie", "watched something" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false,
		emoji : "📺"
	},{
		id : "went-home",
		text : [ "went home" ],
		type : "action",
		category : "movement",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false,
		emoji : "🏠"
	},{
		id : "vacationed",
		text : [ "went on a holiday", "went on a day trip", "went on vacation", "went on a vacation to #place" ] ,
		type : "action",
		category : "movement",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false,
		emoji : "✈️"
	},{
		id : "adventured",
		text : [ "went on a journey", "had an adventure" ] ,
		type : "action",
		category : "movement",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "dined-out",
		text : [ "went out for food", "went out to dinner", "went out for drinks" ] ,
		type : "action",
		category : "movement",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "shopped",
		text : [ "went shopping" ],
		type : "action",
		category : "movement",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "work-meeting",
		text : [ "went to a meeting" ],
		type : "action",
		category : "work",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "work",
		text : [ "went to work" ],
		type : "action",
		category : "work",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "went-to-class",
		text : [ "went to a class" ] ,
		type : "action",
		category : "movement",
		otherCategories : "work",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "went-to-party",
		text : [ "went to a party" ],
		type : "action",
		category : "social",
		otherCategories : "movement",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "went-to-sport",
		text : [ "went to a sporting event" ],
		type : "action",
		category : "movement",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "went-to-doctor",
		text : [ "went to the doctor", "went to the hospital" ],
		type : "action",
		category : "movement",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "avoided-responsibility",
		text : [ "avoided doing something", "avoided a responsibility" ],
		type : "action",
		category : "self",
		otherCategories : "work",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "chatted-with-stranger",
		text : [ "chatted with a stranger" ],
		type : "action",
		category : "social",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "chatted-with-someone",
		text : [ "chatted with someone" ] ,
		type : "action",
		category : "social",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "worked-together",
		text : [ "collaborated with someone", "worked together with someone" ],
		type : "action",
		category : "social",
		otherCategories : "work",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "did-nothing",
		text : [ "did nothing", "couldn't do anything" ],
		type : "action",
		category : "self",
		otherCategories : "negative",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "daydreamed",
		text : [ "daydreamed" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "meditated",
		text : [ "meditated" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "chores",
		text : [ "did chores", "took care of personal business", "did adult things" ],
		type : "action",
		category : "self",
		otherCategories : "movement",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "hobby",
		text : [ "did hobby", "hobbied" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "helped-someone",
		text : [ "did something for someone", "helped someone", "did a favor for someone" ],
		type : "action",
		category : "social",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "got-help",
		text : [ "asked for help", "got help on something from someone" ],
		type : "action",
		category : "social",
		otherCategories : "work",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "exercised",
		text : [ "exercised", "worked out" ],
		type : "action",
		category : "self",
		otherCategories : "movement",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "feeling-excited",
		text : [ "feeling excited for something coming up" ] ,
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "sick",
		text : [ "felt sick", "felt bad" ],
		type : "action",
		category : "self",
		otherCategories : "negative",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "finished-work",
		text : [ "finished some work" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "interneted",
		text : [ "interneted", "puttered around on the internet", "messed around on the internet", "played on the computer" ] ,
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "day-description",
		text : [ "had a #day-adj day" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "good-idea",
		text : [ "had a good idea" ],
		type : "action",
		category : "self",
		otherCategories : "mental",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "nice-convo",
		text : [ "had a nice convo w/ someone" ],
		type : "action",
		category : "social",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "heard-from",
		text : [ "heard from someone" ],
		type : "action",
		category : "social",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "resolved-conflict",
		text : [ "helped resolve a fight" ],
		type : "action",
		category : "social",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "hung-out",
		text : [ "hung out" ],
		type : "action",
		category : "self",
		otherCategories : "social",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "hung-out-with",
		text : [ "hung out with people", "spent quality time with someone" ],
		type : "action",
		category : "social",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "got-hurt",
		text : [ "got hurt", "hurt myself" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "made-plans",
		text : [ "made plans" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "made-something",
		text : [ "made something", "made a thing" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "messed-up",
		text : [ "messed up" ],
		type : "action",
		category : "self",
		otherCategories : "negative",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "missing-someone",
		text : [ "missed someone", "wished someone was here"],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "moved",
		text : [ "moved" ],
		type : "action",
		category : "movement",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "went-somewhere",
		text : [ "went somewhere" ],
		type : "action",
		category : "movement",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "played-game",
		text : [ "played games", "played a game" ],
		type : "action",
		category : "social",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "ran-into",
		text : [ "ran into someone" ],
		type : "action",
		category : "social",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "turning-point",
		text : [ "reached a turning point in something" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "reached-out-to",
		text : [ "reached out to someone" ],
		type : "action",
		category : "social",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "read",
		text : [ "read a book", "read something", "read something #adj" ] ,
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : [ "finished book" ],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "finished-book",
		text : [ "finished a book", "finished a book I was reading" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : [ "read" ],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "realized-something",
		text : [ "realized something" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "saw-something",
		text : [ "saw something", "encountered something" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "saw-something-adj",
		text : [ "saw something #adj" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "saw-art",
		text : [ "looked at art", "saw art", "experienced art" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "learned",
		text : [ "learned something new", "set out to learn something new" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "slept-in",
		text : [ "slept in" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "did-something-cool",
		text : [ "did something cool" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "fight",
		text : [ "someone and someone fought", "someone and someone got into a fight" ],
		type : "action",
		category : "social",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "studied",
		text : [ "studied", "studied for a thing coming up", "studied for a test coming up" ],
		type : "action",
		category : "self",
		otherCategories : "work",
		relatedPhrases : [ "work" ],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "reminisced",
		text : [ "reminisced", "thought of an old memory", "thought of old times" ] ,
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "took-walk",
		text : [ "took a walk", "took a walk to nowhere in particular", "took a drive" ],
		type : "action",
		category : "movement",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "cared-for",
		text : [ "took care of someone" ],
		type : "action",
		category : "social",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "self-care",
		text : [ "took care of myself", "did self-care" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : [ "cared-for" ],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "treated-self",
		text : [ "treated myself", "indulged in something nice" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : [ "guilty-pleasure", "slept-in", "self-care" ],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "guilty-pleasure",
		text : [ "indulged in a guilty pleasure" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : [ "treated-self" ],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "cooked",
		text : [ "cooked", "cooked something yummy" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "people-visited",
		text : [ "had people over", "had someone over" ],
		type : "action",
		category : "social",
		otherCategories : "",
		relatedPhrases : [ "visited-people" ],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "visited-people",
		text : [ "visited friends", "visited relatives" ],
		type : "action",
		category : "social",
		otherCategories : "movement",
		relatedPhrases : [ "people-visited" ],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "met-someone",
		text : [ "met someone new" ] ,
		type : "action",
		category : "social",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "introduced",
		text : [ "introduced someone to someone" ],
		type : "action",
		category : "social",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "didnt-want-to",
		text : [ "did something I didn't want to" ],
		type : "action",
		category : "self",
		otherCategories : "negative",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "had-trouble",
		text : [ "did something I had a lot of trouble doing" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "did-something-i-love",
		text : [ "did something I love" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "did-something-i-regret",
		text : [ "did something I regret" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "did-something-weird",
		text : [ "did something weird", "did something unusual", "did something uncharacteristic" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "reassured",
		text : [ "reassured someone", "comforted someone" ],
		type : "action",
		category : "social",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "started-conversation",
		text : [ "struck up a conversation with someone", "started a conversation with someone" ],
		type : "action",
		category : "social",
		otherCategories : "",
		relatedPhrases : [ "met-someone" ],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "gave-presentation",
		text : [ "gave a presentation", "gave a speech", "spoke in public", "spoke to an audience" ],
		type : "action",
		category : "social",
		otherCategories : "work",
		relatedPhrases : [ "performed" ],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "performed",
		text : [ "performed in front of an audience" ] ,
		type : "action",
		category : "social",
		otherCategories : "",
		relatedPhrases : [ "gave-presentation" ],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "started-job",
		text : [ "started a new job" ],
		type : "action",
		category : "work",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "got-job",
		text : [ "got a new job" ] ,
		type : "action",
		category : "work",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "traffic",
		text : [ "was stuck in traffic", "got stuck in traffic" ],
		type : "action",
		category : "external",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "waited",
		text : [ "waited for something" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "dreamed",
		text : [ "had a #adj dream" ],
		type : "action",
		category : "self",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "shared",
		text : [ "shared a personal thing with someone" ],
		type : "action",
		category : "social",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "saw-talk",
		text : [ "saw a talk", "saw a #adj talk", "heard a talk", "heard a #adj talk" ],
		type : "action",
		category : "social",
		otherCategories : "work",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "led",
		text : [ "led a thing", "led a team", "led a group", "led a meeting" ],
		type : "action",
		category : "social",
		otherCategories : "work",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "then",
		text : [ "then" ],
		type : "connector",
		category : "connector",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "event",
		afterContext : "event",
		flippable : false
	},{
		id : "caused",
		text : [ "which caused" ],
		type : "connector",
		category : "connector",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "event",
		afterContext : "event",
		flippable : false
	},{
		id : "led-to",
		text : [ "which led to" ],
		type : "connector",
		category : "connector",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "event",
		afterContext : "event",
		flippable : false
	},{
		id : "while",
		text : [ "while" ],
		type : "connector",
		category : "connector",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "event",
		afterContext : "event",
		flippable : false
	},{
		id : "which-involved",
		text : [ "which involved" ],
		type : "connector",
		category : "connector",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "event",
		afterContext : "event",
		flippable : false
	},{
		id : "because",
		text : [ "because" ],
		type : "connector",
		category : "connector",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "event",
		afterContext : "event",
		flippable : false
	},{
		id : "to",
		text : [ "to" ],
		type : "connector",
		category : "connector",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "event",
		afterContext : "event",
		flippable : false
	},{
		id : "but",
		text : [ "but" ],
		type : "connector",
		category : "connector",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "event",
		afterContext : "event",
		flippable : false
	},{
		id : "by",
		text : [ "by" ],
		type : "connector",
		category : "connector",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "event",
		afterContext : "event",
		flippable : false
	},{
		id : "instead-of",
		text : [ "instead of" ],
		type : "connector",
		category : "connector",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "event",
		afterContext : "event",
		flippable : false
	},{
		id : "at",
		text : [ "at" ],
		type : "connector",
		category : "connector",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "event",
		afterContext : "place",
		flippable : false
	},{
		id : "near",
		text : [ "near" ],
		type : "connector",
		category : "connector",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "event",
		afterContext : "place",
		flippable : false
	},{
		id : "on-the-way-to",
		text : [ "on the way to" ],
		type : "connector",
		category : "connector",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "event",
		afterContext : "place",
		flippable : false
	},{
		id : "with",
		text : [ "with" ],
		type : "connector",
		category : "connector",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "action",
		afterContext : "character",
		flippable : false
	},{
		id : "for",
		text : [ "for" ],
		type : "connector",
		category : "connector",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "action",
		afterContext : "character",
		flippable : false
	},{
		id : "someone-was-adj",
		text : [ "#someone was #adj" ],
		type : "event",
		category : "social",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "got-recognition",
		text : [ "people said nice things about me", "felt recognized", "got recognition" ],
		type : "event",
		category : "social",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "angry-with-me",
		text : [ "someone got angry with me", "someone got upset with me" ],
		type : "event",
		category : "social",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "someone-did-something-cool",
		text : [ "someone did something cool" ],
		type : "event",
		category : "social",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "someone-bothered",
		text : [ "someone bothered me", "someone got on my nerves", "someone annoyed me" ],
		type : "event",
		category : "social",
		otherCategories : "self",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "someone-was-jerk",
		text : [ "someone was a jerk to me", "someone was bitchy at me", "someone yelled at me", "someone got angry at me" ],
		type : "event",
		category : "social",
		otherCategories : "negative",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "power-outage",
		text : [ "there was a power outage somewhere" ],
		type : "event",
		category : "external",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "storm",
		text : [ "it stormed", "there was a storm" ],
		type : "event",
		category : "external",
		otherCategories : "event",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "was-introduced",
		text : [ "someone introduced me to someone" ],
		type : "event",
		category : "social",
		otherCategories : "",
		relatedPhrases : [ "met-someone", "introduced" ],
		beforeContext : "",
		afterContext : "",
		flippable : false
	},{
		id : "which made me",
		text : [ "which made me #adj" ],
		type : "modifier",
		category : "modifier",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "event",
		afterContext : "",
		flippable : false
	},{
		id : "as-usual",
		text : [ "as usual" ],
		type : "modifier",
		category : "modifier",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "action",
		flippable : true
	},{
		id : "again",
		text : [ "again" ],
		type : "modifier",
		category : "modifier",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "action",
		flippable : true
	},{
		id : "didnt",
		text : [ "didn't" ],
		type : "modifier",
		category : "modifier",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "action",
		flippable : false
	},{
		id : "accidentally",
		text : [ "accidentally" ],
		type : "modifier",
		category : "modifier",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "action",
		flippable : false
	},{
		id : "just",
		text : [ "just" ],
		type : "modifier",
		category : "modifier",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "action",
		flippable : false
	},{
		id : "finally",
		text : [ "finally" ],
		type : "modifier",
		category : "modifier",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "event",
		flippable : true
	},{
		id : "tried",
		text : [ "tried to" ],
		type : "modifier",
		category : "modifier",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "action",
		flippable : false
	},{
		id : "wanted",
		text : [ "wanted to" ],
		type : "modifier",
		category : "modifier",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "action",
		flippable : false
	},{
		id : "needed",
		text : [ "needed to" ],
		type : "modifier",
		category : "modifier",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "action",
		flippable : false
	},{
		id : "want",
		text : [ "want to" ],
		type : "modifier",
		category : "modifier",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "action",
		flippable : false
	},{
		id : "need",
		text : [ "need to" ],
		type : "modifier",
		category : "modifier",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "action",
		flippable : false
	},{
		id : "planned",
		text : [ "planned to" ],
		type : "modifier",
		category : "modifier",
		otherCategories : "",
		relatedPhrases : [],
		beforeContext : "",
		afterContext : "action",
		flippable : false
	}
];