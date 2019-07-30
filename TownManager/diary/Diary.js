/*
 * Controller
 * 
 * The main module, which calls functions from and passes data between 
 * DataWrangler.js and Display.js
 * 
 * An immediately invoked function expression with explicitly publicized functions
 * (the Revealing Module Pattern) - returns an object, 
 * prevents the module from being invoked multiple times,
 * and allows public vs private functions and variables
 */

var Diary = ( function() {
	
	function init () {

		// Initialize all other modules 
		initActionsData();
		initDisplay( getAllActions() );

		// Use JQueryUI to make the diary entry divs sortable (via drag-and-drop)
		//$( ".sortable" ).sortable();
		document.getElementById("submit").onclick = function () {submitEntry()};
		position = 0;
	}

	// Adds a given phrase/action/event to the diary entry
	function addToDiary (phrase) {

		var actionObj = getActionById(phrase);

		addPhraseToDiary (actionObj, 0);
	}

	var position;
	var db;
	var actions_db;
	var currentDiaryEntry = [];
	function initActionsData () {
        // Make Lokijs database (with name of file to persist data to)
		db = new loki('db.json');
		createActionCollection();
	}

	function createActionCollection () {

		// Add a collection called 'actions' to the database
		actions_db = db.addCollection('actions');

		// Add a bunch of action documents to the actions collection
		// (One document = one action)
		actions_db.insert(phrases);

	}

	function getAllActions () {
		// Get all actions sorted by category
		return actions_db.chain().simplesort("category").data();
	}

	function getActionById (id) {
		return actions_db.findOne({id: id});
	}

	// Return an array of phrases whose 'text' property contains an 
	// exact match of the given text parameter (can't be a substring)
	function getActionByText (text) {
		return actions_db.find({ 'text' : { '$contains' : text }});
	}

	// Return an array of phrase objects whose 'text' property (an array of strings)
	// contains the substring given by the parameter, text
	function getActionBySubstring (text) {

		// Where query - filters data by given boolean function
		return actions_db.where( function(phrase) {

			// Construct a new array of alt text strings for this phrase, 
			// filtered by whether or not it contains the text parameter as a substring
			let filtered = phrase["text"].filter(s => s.includes(text));

			// If there is anything in this phrase's filtered array, return true
			return filtered.length ? true : false; 
		});
	}


	// Doesn't work - max call stack size exceeded
	function printActions () {
		console.log(getAllActions());
	}

	function initDisplay (actionLibrary) {
		var d = new Date();
		var month = d.getMonth() + 1;
		var day = d.getDate();
		var year = d.getFullYear();
		displayPhrases (actionLibrary);
		addDateLine (month + "/" + day + "/" + year);

    }

	function addDateLine (date) {
		$('#dateline').text(date);
	}

	/* 
	 * Construct phrases display HTML elements, and attach 
	 * onclick event listeners to them.
	 */
	function displayPhrases (actionLibrary) {
		
		var elements = [];
		actionLibrary.forEach( function(action) {
	    	var element = $('<button ' + 
	    			'class="phrase '+ action["category"] + '" ' +
	    			'id="'+ action["id"] + '" ' +
	    			'onclick="Diary.addToDiary(this.id)"' + '>' +
	    				action["text"][0] + 
	    		'</button>');

	    	elements.push(element);
		});
		$('.phrase-container').append(elements);
	}

	
	function addPhraseToDiary ( actionObj, textIndex ) {
		var element = $('<div class="diary-phrase close" id = '+actionObj["id"] + '>' + actionObj["text"][textIndex] + '</div>')
		element[0].addEventListener("click", function() {
			this.remove();

  		});
		
		$('#diary').append(element);
	}

 	return { // Public functions: 
 		init : init,
 		addToDiary : addToDiary,
 		getActionByText : getActionByText,
 		getActionBySubstring : getActionBySubstring
 	}

	function submitEntry() {
 		console.log ("entry submitted!");
 		let diaryEntry = [];
 		var phraseNodes = document.getElementById("diary").querySelectorAll(".diary-phrase");
 		phraseNodes.forEach(function(element){
			diaryEntry.push(element.id);
		});
		console.log(diaryEntry);
		drawEmoji(diaryEntry);
		document.getElementById ("fourthBackButton").click();

 	}


 	var day0 = [];
 	var day1 = [];
 	var day2 = [];
 	var day3 = [];

})(); // IIFE invoked here

/* Initialize Controller when document is fully loaded */
window.onload = function(){
	Diary.init();

}

 	
