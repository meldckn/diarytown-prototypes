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

var Controller = ( function() {
	
	function init () {

		// Initialize all other modules 
		DataWrangler.init();
		Display.init( DataWrangler.getAllActions() );

		// Use JQueryUI to make the diary entry divs sortable (via drag-and-drop)
		$( ".sortable" ).sortable();

	}

	// Adds a given phrase/action/event to the diary entry
	function addToDiary (phrase) {

		var actionObj = DataWrangler.getActionByName(phrase);

		Display.addPhraseToDiary (actionObj, 0);
	}

 	return { // Public functions: 
 		init : init,
 		addToDiary : addToDiary
 	}

})(); // IIFE invoked here

/* Initialize Controller when document is fully loaded */
$(document).ready(function () { Controller.init(); });
