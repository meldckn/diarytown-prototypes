/* 
 * Singleton DataWrangler class
 * 
 * Interfaces with Loki.js to store, manage, and query data objects
 */

var DataWrangler = (function () {

	var db;
	var actions_db;

	function init () {
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


    return { // Public Functions:
        
        init : init,
        getAllActions : getAllActions, 
        getActionByName : getActionByName,
        
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