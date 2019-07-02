// Make an array of actions
function makeList() {
	let listData = [
	"went home",
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
	"avoid doing something", "avoided a responsibility",
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
	"missed someone", "wished someone was here", "missing someone",
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
	"there was a power outage somewhere",
	"it stormed", "there was a storm",
	"cooked", "cooked something yummy",
	"had people over", "had someone over",
	"visited friends", "visited relatives"
	];

    for (let i = 0; i < listData.length; i++) {
        let listElement = document.createElement("li");
        listElement.innerHTML = listData[i];
        document.getElementById("list").appendChild(listElement);
    }
}

// Search through list
function search() {
	let input, ul, li, textValue;

	input = document.getElementById("myInput");
	ul = document.getElementById("list");
	li = ul.getElementsByTagName("li");

	for (let i = 0; i < li.length; i++) {
		textValue = li[i].innerText;
		if (textValue.toUpperCase().indexOf(input.value.toUpperCase()) > -1) {
			li[i].style.display = "";
		} else {
			li[i].style.display = "none";
		}
	}
}


makeList();