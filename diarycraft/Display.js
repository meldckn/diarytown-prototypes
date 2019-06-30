/* 
 * Singleton Display class
 * 
 * In charge of displaying things on the screen, managing HTML elements
 */

var Display = (function () {

	function init (actionLibrary) {

		displayPhrases (actionLibrary);
		addDateLine ("Tuesday, Feb. 26, 2019");

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
	    			'onclick="Controller.addToDiary(this.id)"' + '>' +
	    				action["text"][0] + 
	    		'</button>');

	    	elements.push(element);
		});
		$('.phrase-container').append(elements);
	}

	function addPhraseToDiary ( actionObj, textIndex ) {
		var element = $('<div class="diary-phrase">' + actionObj["text"][textIndex] + '</div>')
		$('#diary').append(element);
	}

    return { // Public Functions:
        
    	init: init,
    	displayPhrases : displayPhrases,
    	addPhraseToDiary : addPhraseToDiary,
    	addDateLine : addDateLine,
        
        // Returns the unique instance
        // Creates the instance if it doesn't exist yet 
        getInstance : function () {
            if (!instance) {
                instance = createInstance ();
            }
            return instance;
        }

    };
})(); 