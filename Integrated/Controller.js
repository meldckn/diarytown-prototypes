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
		// Menu constructor takes a menu type and an object of buttons mapped to click event functions
		// Eventually, should check if the current user has already made a town
		// (by checking if one exists in localStorage, for example)
		// Bind each function to this Controller object, otherwise they'll become baseless
		this.startMenu = new Menu("start",{
			"Start": this.startNewTown.bind(this),
			"Options": this.openOptions.bind(this),
			"About": this.openAbout.bind(this)
		});

		this.startMenu.display();
		//$('body').click( _ => startMenu.hide());

		this.town = new Town();

		//startNewTown();

	}

	startNewTown () {
		
		this.startMenu.animateOut();
	
		let canvas = document.createElement("canvas");
		document.body.appendChild(canvas);
	/*
		window.setTimeout(function(){
			map.style.display = 'block'
			map.style.opactiy = 0;
			anime({
				targets:'.map',
				opacity:1,
				delay:200
			})
			anime({
				targets:'.map',
				translateY: 100,
				duration:1000
			})
		},500)
		draw();*/

	}

	openOptions () {
		console.log("In openOptions()");
	}

	openAbout () {
		console.log("In openAbout()");
	}

}

// Create a new Controller after DOM has loaded (via the defer HTML attribute)
let controller = new Controller();
console.log(this);
document.body.addEventListener("click", function() {
	console.log(this);
});

