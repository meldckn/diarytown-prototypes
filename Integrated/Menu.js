/*
 * Menu class
 * 
 * In charge of displaying and accepting user input on in-game menus
 *
 * Class Properties: type, id, buttons, and html
 */

class Menu {

	// Creates a new menu of a given menuType, and attaches functions
	// to buttons on the menu, as specified in the given eventMap object 
	// (where keys are button names and values are the functions to run when that button is clicked).
	// The new menu starts visible by default.
	// menuType can be "start" (and eventually: "options", "about", etc).
	constructor (menuType, eventMap) { 

		this.type = menuType;
		this.events = eventMap;
		this.buttons = Object.keys(eventMap); // an array of all keys of the eventMap

		if (menuType === "start") {
			this.id = "startMenu";
			this.html = this.createStartMenuHTML();

		} else {
			console.error ("Unrecognized menu type '"+ menuType +"' in the Menu constructor")
			return;
		}

		document.body.appendChild(this.html);
		//this.hide();

	}

	// Construct menu buttons as HTML elements and add onClick listeners to them
	// Note: might want to generalize this into a createHTML function for any menuType
	createStartMenuHTML () {

		let menu = document.createElement("div");
		menu.id = this.id;

		let h1 = document.createElement("h1");
		h1.innerHTML = "DIARYTOWN";
		menu.appendChild(h1);

		let h2 = document.createElement("p");
		h2.innerHTML = "Melanie Dickinson, Max Kreminski";
		menu.appendChild(h2);

		let h3 = document.createElement("p");
		h3.id = "interns";
		h3.innerHTML = "Akhil Vemuri, Daniel Man, Megna Anand, Anish Kashyap";
		menu.appendChild(h3);

		let buttonContainer = document.createElement("div");
		buttonContainer.id = "startMenuButtons";
		buttonContainer.class = "menuButtons";

		// For each string in this.buttons array, create a new HTML button 
		// Need arrow function, so it'll take its 'this' value from its immediate enclosing scope,
		// rather than normal closure/inner functions, which don't have access to the 'this' of outer functions
		this.buttons.forEach ( (buttonName) => {

			let buttonElement = document.createElement("button");
			buttonElement.id = buttonName.toLowerCase();
			buttonElement.innerHTML = buttonName;

			buttonElement.addEventListener("click", this.events[buttonName]);

			buttonContainer.appendChild(buttonElement);

			if (buttonName === "Start") {
				let br = document.createElement("br");
				buttonContainer.appendChild(br);
			}

		}); 

		menu.appendChild(buttonContainer);

		return menu;

	}

	// Show the HTML elements for this menu
	display () {
		document.getElementById(this.id).style.display = "inline-block";
	}

	// Hide the HTML elements for this menu
	hide () {
		document.getElementById(this.id).style.display = "none";
	}

	// Use anime.js to make this menu bounce up slightly before hiding 
	animateOut () {
		
		let menu = document.getElementById(this.id);

		anime({
			targets: menu,
			opacity:0,
			delay:200
		})
		anime({
			targets: menu,
			translateY:-100,
			duration: 1000
		})
		
		window.setTimeout(function(){
			menu.style.display = 'none';
		}, 500)

	}

}