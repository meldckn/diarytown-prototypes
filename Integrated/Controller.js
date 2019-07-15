/*
 * Controller
 * 
 * The main Diarytown class, which starts, stops, and passes messages 
 * between all other modules depending on game logic and user input
 * 
 * Should be treated as a singleton, though not currently enforced
 */

class Controller { 

	constructor () {
		
		// Initialize and display start menu
		this.startMenu = new Menu("start");
		this.startMenu.display();
		//$('body').click(_ => startMenu.hide());

		this.startNewTown();

	}

	startNewTown () {
		let town = new Town(); 
	}

}

// Create a new Controller after DOM has loaded (via the defer HTML attribute)
let controller = new Controller();

