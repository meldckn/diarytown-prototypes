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
		$( ".sortable" ).sortable();

	}

	// Adds a given phrase/action/event to the diary entry
	function addToDiary (phrase) {

		var actionObj = getActionByName(phrase);

		addPhraseToDiary (actionObj, 0);
	}

	var db;
	var actions_db;

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
		actions_db.insert(actions);

	}

	function getAllActions () {
		// Get all actions sorted by category
		return actions_db.chain().simplesort("category").data();
	}

	function getActionByName (name) {
		return actions_db.findOne({name: name});
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
	    			'id="'+ action["name"] + '" ' +
	    			'onclick="Diary.addToDiary(this.id)"' + '>' +
	    				action["text"][0] + 
	    		'</button>');

	    	elements.push(element);
		});
		$('.phrase-container').append(elements);
	}

	function addPhraseToDiary ( actionObj, textIndex ) {
		var element = $('<div class="diary-phrase close">' + actionObj["text"][textIndex] + '</div>')
		console.log(element);
		element[0].addEventListener("click", function() {
  	console.log("closebutton clicked");
    this.style.display = "none";
  });
		$('#diary').append(element);
}

 	return { // Public functions: 
 		init : init,
 		addToDiary : addToDiary
 	}

})(); // IIFE invoked here

/* Initialize Controller when document is fully loaded */
$(document).ready(function () { Diary.init(); });

