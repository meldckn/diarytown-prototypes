//initializing HTML elements for use in JS file
let startButton = document.getElementById('start');
let optionsButton = document.getElementById('options');
let aboutButton = document.getElementById('about');
let startMenu = document.getElementById('startMenu');
let optionsMenu = document.getElementById('optionsMenu');
let backButton = document.getElementById('backButton');
let map = document.getElementById('map');
let aboutMenu = document.getElementById('aboutMenu');
let thirdBackButton = document.getElementById("thirdBackButton");
let thirdBackButtonContainer = document.getElementById("thirdBackButtonContainer");
let slider = document.getElementById('myRange');
let music = document.getElementById('music');

//assigning classNames
map.className = "map";
thirdBackButtonContainer.className = "thirdBackButtonContainer";
thirdBackButton.className = "thirdBackButton";
startMenu.className = "startMenu";
optionsMenu.className = "optionsMenu";
aboutMenu.className = "aboutMenu";

//hiding certain things from appearing right away on the start menu
map.style.display = 'none';
optionsMenu.style.display = 'none';
aboutMenu.style.display = 'none';
thirdBackButtonContainer.style.display = 'none';


//Akhil's Building management code below:

//storage of image location addresses for the building files used
let buildings = ["assets/fireRed2Edited.png", "assets/fireRed3Edited.png", "assets/fireRed4Edited.png",
			  	 "assets/fireRed5Edited.png", "assets/fireRed6Edited.png", "assets/fireRed7Edited.png"];
let xyCanvasCoords = [
	[105, 40, 100, 70],
	[105, 115, 100, 70],
	[105, 190, 100, 70],				// Top Left (Left Of Pathway)
	[255, 40, 100, 70],
	[255, 115, 100, 70],
	[255, 190, 100, 70],				// Top Left (Right Of Pathway)
	[395, 40, 100, 70],
	[395, 115, 100, 70],
	[395, 190, 100, 70],				// Top Middle (Left Of Pathway)
	[500, 40, 100, 70],
	[605, 40, 100, 70],
	[710, 40, 100, 70],
	[815, 40, 100, 70],					// Top Middle (Above Pathway)
	[635, 190, 100, 70],
	[740, 190, 100, 70],
	[845, 190, 100, 70],				// Top Middle (Below Pathway)
	[920, 40, 100, 70],
	[920, 115, 100, 70],				// Top Right (Right Of Pathway)
];

let canvases = [];
let ctxs = [];
for (let i = 0; i < xyCanvasCoords.length; i++) {
	canvases[i] = document.createElement("canvas");
	ctxs[i] = canvases[i].getContext("2d");
	map.insertBefore(canvases[i], map.firstChild);
	canvases[i].style.border = "1px solid red";
	canvases[i].style.position = "absolute";
	canvases[i].style.marginLeft = xyCanvasCoords[i][0] + "px";
	canvases[i].style.marginTop = xyCanvasCoords[i][1] + "px";
	canvases[i].width = xyCanvasCoords[i][2];
	canvases[i].height = xyCanvasCoords[i][3];
}

function shuffle(a, b) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
        [b[i], b[j]] = [b[j], b[i]];
    }
    return [a, b];
}

let buildingsOnSpawn = 7;
function draw() {
	for (let i = 0; i < buildingsOnSpawn; i++) {
		let randCanvasesAndCtxs = shuffle(canvases, ctxs);
		let randBuildingImg = new Image();
		randBuildingImg.src = buildings[Math.floor(Math.random()*buildings.length)];
		randBuildingImg.onload = function() {
			let x = randCanvasesAndCtxs[0][i].width / 2 - randBuildingImg.width / 2;
			let y = randCanvasesAndCtxs[0][i].height / 2 - randBuildingImg.height / 2;
			randCanvasesAndCtxs[1][i].drawImage(randBuildingImg, x, y);
		}
	}
}






//Daniel's code below:

//start of character animating thing

//storage of image location addresses for the main character frames
//front1-2-3, left1-2-3, right 1-2-3, back1-2-3
let mainCharacterAnimationAddresses = ["assets/frame1Edited.png", "assets/frame2Edited.png", 
"assets/frame3Edited.png", "assets/frame4Edited.png", "assets/frame5Edited.png", 
"assets/frame6Edited.png", "assets/frame7Edited.png", "assets/frame8Edited.png",
"assets/frame9Edited.png", "assets/frame10Edited.png", "assets/frame11Edited.png",
"assets/frame12Edited.png"];


//initializes the animation array that contains an Image element for each Hero movement frame
let mainCharacterAnimations = [];
for (let i = 0; i<mainCharacterAnimationAddresses.length; i++) {
	let tempFrame = new Image();
	tempFrame.src = mainCharacterAnimationAddresses[i];
	mainCharacterAnimations.push(tempFrame);
}

function turnOffMusic() {
	if (document.getElementById("musicToggle").checked) {
		music.muted = true;
	}
	if (!(document.getElementById("musicToggle").checked)) {
		music.muted = false;
	}
}

//initializes Hero
let hero = document.createElement('div');
function drawHero() {
	hero.className = "hero";
	hero.appendChild(mainCharacterAnimations[1]);
	map.appendChild(hero);
}

//collision detection function, goes through every possible x value and defines y value boundaries
function onThePath(x, y) {
	//Currently set for 1640 x 975 display
	if (x<244) {
		return false;
	} 
	if (x>1374){
		return false;
	}
	if (y>689) {
		return false;
	}
	if (y<45) {
		return false;
	}
	if ((x>=244 && x<303) && (y<416 || y>461)) {
		return false;		
	}
	if ((x>=303 && x<334) && (y<237 || y>461)) {
		return false;
	}
	if ((x>=334 && x<361) && (y<299 || y>461)) {
		return false;
	}
	if ((x>=361 && x<374) && (y<299 || y>478)) {
		return false;
	}
	if ((x>=374 && x <415) && (y<299 || ((y>319 && y<437)||(y>478)))) {
		return false;
	}
	if ((x>=415 && x<424) && ((y>319 && y<437)||(y>478))) {
		return false;
	}
	if ((x>=424 && x<438) && ((y<299 || (y>319 && y<437)||(y>478)))) {
		return false;
	}
	if ((x>=438 && x<450) && (y<299 ||((y>319 && y<437)||(y>689)))) {
		return false;
	}
	if ((x>=450 && x<492) && (y<299 || ((y>319 && y<437) || y>478))) {
		return false;
	}
	if ((x>=492 && x<503) && (y<237 || ((y>319 && y<437) || y>478))) {
		return false;
	}
	if ((x>=503 && x<542) && (y<299 || ((y>319 && y<437) || y>478))) {
		return false;
	}
	if ((x>=542 && x<581) && (y<299 || y>478)) {
		return false;
	}
	if ((x>=581 && x<614) && (y<237 || y>478)) {
		return false;
	}
	if ((x>=614 && x<702) && (y<237 || ((y>281 && y<453) || y>478))) {
		return false;
	}
	if ((x>=702 && x<791) && (((y<94) || (y>139 && y<237)) || ((y>281 && y<453) || y>617))) {
		return false;
	}
	if ((x>=791 && x<793) && (y<94 || ((y>281 && y<453) || y>617))) {
		return false;
	}
	if ((x>=793 && x<803) && ((y<94||(y>281 && y<453)) || ((y>499 && y<595)||y>617))) {
		return false;
	}
	if ((x>=803 && x<854) && ((((y<94)||(y>139 && y<237)) || ((y>281 && y<453)||(y>499 && y<595))) || y>617)) {
		return false;
	}
	if ((x>=854 && x<868) && ((((y<94 || (y>139 && y<237)) || (y>499 && y<595))) || y>617)) {
		return false;
	}
	if ((x>=868 && x<1094) && ((((y<94)||(y>139 && y<237)) || ((y>281 && y<453)||(y>499 && y<595))) || y>617)) {
		return false;
	}
	if ((x>=1094 && x<1140) && ((y<237||(y>281 && y<453)) || ((y>499 && y<595)|| y>617))) {
		return false;
	}
	if ((x>=1140 && x<1213) && ((y<216||(y>281 && y<453)) || ((y>499 && y<595)|| y>617))) {
		return false;
	}
	if ((x>=1213 && x<=1374) && (y<216 || y>261)) {
		return false;
	}
	return true;
}

//changes the image appended to the Hero div based on which step/frame he's on
function animationChange(input, wCounter, aCounter, sCounter, dCounter) {
	//walking up
	if (input === 'w') {
		//left step
		if (wCounter%40 === 1) {
			hero.removeChild(hero.childNodes[0]);
			hero.appendChild(mainCharacterAnimations[9]);
		}
		//neutral step
		if (wCounter%20 === 0) {
			hero.removeChild(hero.childNodes[0]);
			hero.appendChild(mainCharacterAnimations[10]);
		}
		//right step
		if (wCounter%40 === 3) {
			hero.removeChild(hero.childNodes[0]);
			hero.appendChild(mainCharacterAnimations[11]);
		}
	}
	//walking left
	if (input === 'a') {
		//left step
		if (aCounter%40 === 1) {
			hero.removeChild(hero.childNodes[0]);
			hero.appendChild(mainCharacterAnimations[3]);
		}
		//neutral step
		if (aCounter%20 === 0) {
			hero.removeChild(hero.childNodes[0]);
			hero.appendChild(mainCharacterAnimations[4]);
		}
		//right step
		if (aCounter%40 === 3) {
			hero.removeChild(hero.childNodes[0]);
			hero.appendChild(mainCharacterAnimations[5]);
		}
	}
	//walking down
	if (input === 's') {
		//left step
		if (sCounter%40 === 1) {
			hero.removeChild(hero.childNodes[0]);
			hero.appendChild(mainCharacterAnimations[0]);
		}
		//neutral step
		if (sCounter%20 === 0) {
			hero.removeChild(hero.childNodes[0]);
			hero.appendChild(mainCharacterAnimations[1]);
		}
		//right step
		if (sCounter%40 === 3) {
			hero.removeChild(hero.childNodes[0]);
			hero.appendChild(mainCharacterAnimations[2]);
		}
	}
	//walking right
	if (input === 'd') {
		//left step
		if (dCounter%40 === 1) {
			hero.removeChild(hero.childNodes[0]);
			hero.appendChild(mainCharacterAnimations[6]);
		}
		//neutral step
		if (dCounter%20 === 0) {
			hero.removeChild(hero.childNodes[0]);
			hero.appendChild(mainCharacterAnimations[7]);
		}
		//right step
		if (dCounter%40 === 3) {
			hero.removeChild(hero.childNodes[0]);
			hero.appendChild(mainCharacterAnimations[8]);
		}
	}
}

//ABOUT BUTTON:

aboutButton.onclick = function() {
	anime({
		targets:'.startMenu',
		opacity:0,
		delay:200	
	})
	//bounces the startMenu down to disappear
	anime({
		targets:'.startMenu',
		translateX: 75,
		duration: 1000
	})
	
	//gets rid of title screen
	window.setTimeout(function(){
		startMenu.style.display = 'none';
	}, 500)
	window.setTimeout(function(){
		aboutMenu.style.display = 'block'
		aboutMenu.style.opactiy = 0;
		//fades in the aboutMenu
		anime({
			targets:'.aboutMenu',
			opacity:1,
			delay:200			
		})
		//bounces the aboutMenu down to appear
		anime({
			targets:'.aboutMenu',
			translateX: -75,
			duration:1000
		})
		
	},500)

	//Back to Start menu from About Menu
	secondBackButton.onclick = function() {
		anime({
			targets:'.aboutMenu',
			opacity:0,
			delay:200	
		})
		//bounces the aboutMenu left to disappear
		anime({
			targets:'.aboutMenu',
			translateX:0,
			duration: 1000
		})
		//gets rid of About Menu screen
		window.setTimeout(function(){
			aboutMenu.style.display = 'none';
		}, 500)

		//transition in the Start Menu
		window.setTimeout(function(){
			startMenu.style.display = 'block'
			//drawingBoard.style.display= 'block'
			startMenu.style.opactiy = 0;
			//fades in the StartMenu
			anime({
				targets:'.startMenu',
				opacity:1,
				delay:200			
			})
			//bounces the StartMenu back right to appear
			anime({
				targets:'.startMenu',
				translateX: 0,
				duration:1000
			})
			
		},500)
	}
}



//OPTIONS BUTTON:

optionsButton.onclick = function() {
	anime({
		targets:'.startMenu',
		opacity:0,
		delay:200	
	})
	//bounces the startMenu left to disappear
	anime({
		targets:'.startMenu',
		translateX:-75,
		duration: 1000
	})
	
	//gets rid of title screen
	window.setTimeout(function(){
		startMenu.style.display = 'none';
	}, 500)

	//transition in the Options Menu
	window.setTimeout(function(){
		optionsMenu.style.display = 'block'
		//drawingBoard.style.display= 'block'
		optionsMenu.style.opactiy = 0;
		//fades in the optionsMenu
		anime({
			targets:'.optionsMenu',
			opacity:1,
			delay:200			
		})
		//bounces the optionsMenu down to appear
		anime({
			targets:'.optionsMenu',
			translateX: 75,
			duration:1000
		})
		
	},500)

	//Back to start Menu from Options Menu
	backButton.onclick = function() {
		anime({
			targets:'.optionsMenu',
			opacity:0,
			delay:200	
		})
		//bounces the optionsMenu left to disappear
		anime({
			targets:'.optionsMenu',
			translateX:0,
			duration: 1000
		})
		//gets rid of options Menu screen
		window.setTimeout(function(){
			optionsMenu.style.display = 'none';
		}, 500)

		//transition in the Start Menu
		window.setTimeout(function(){
			startMenu.style.display = 'block'
			//drawingBoard.style.display= 'block'
			startMenu.style.opactiy = 0;
			//fades in the StartMenu
			anime({
				targets:'.startMenu',
				opacity:1,
				delay:200			
			})
			//bounces the StartMenu back right to appear
			anime({
				targets:'.startMenu',
				translateX: 0,
				duration:1000
			})
			
		},500)
	}
}


//START BUTTON:

//Tracks keyup and keydown events
let currentKeys = {};
window.onkeydown = function(event) {
	if (!currentKeys[event.key]) {
		currentKeys = {};
		currentKeys[event.key] = true;
	} 
};
window.onkeyup=function(event) {
	delete currentKeys[event.key];
};
//sets starting position of Hero
let currentX = 570;
let currentY = 400;
//global variable for length of each Hero stride
let moveBy = slider.value/100;

slider.oninput = function() {
	moveBy = this.value/100;
}

let alreadyDrawn = false;
//start button main method
startButton.onclick = function() {
	//transitions out all of the title screen

	//fades out the StartMenu 
	anime({
		targets:'.startMenu',
		opacity:0,
		delay:200	
	})
	//bounces the startMenu down to disappear
	anime({
		targets:'.startMenu',
		translateY:-75,
		duration: 1000
	})
	
	//gets rid of title screen
	window.setTimeout(function(){
		startMenu.style.display= 'none';
		thirdBackButtonContainer.style.display = 'block';
	}, 500)

	
	//transitions in the town map
	window.setTimeout(function(){
		map.style.display = 'block'
		//drawingBoard.style.display= 'block'
		map.style.opactiy = 0;
		//fades in the map
		anime({
			targets:'.map',
			opacity:1,
			delay:200			
		})
		//bounces the map down to appear
		anime({
			targets:'.map',
			translateY: 93,
			duration:1000
		})
		
	},500)

	if (!alreadyDrawn) {
		//draws buildings
		draw();
		//draws hero
		drawHero();	
		alreadyDrawn = true;
	}

	//movement of Hero via W-A-S-D keys
	let wCounter = 2;
	let aCounter = 2;
	let sCounter = 2;
	let dCounter = 2;
	var refresh = window.setInterval(function(event) {
		//do not change below
		let stepSpeed = 1;

		//upon W pressed
		if (currentKeys['w'] || currentKeys['W']) {
			if (onThePath(currentX, currentY-moveBy)) {
				currentY-=moveBy;
				hero.style.top = currentY;
			}
			animationChange('w', (wCounter), (aCounter), (sCounter), (dCounter));
			//console.log(currentX+ " "+ currentY);
			wCounter+=stepSpeed;
		}
		//upon A pressed
		if (currentKeys['a']|| currentKeys['A']) {
			if (onThePath(currentX-moveBy, currentY)) {
				currentX-=moveBy;
				hero.style.left = currentX;
			}
			animationChange('a', (wCounter), (aCounter), (sCounter), (dCounter));
			//console.log(currentX+ " "+ currentY);
			aCounter+=stepSpeed;
		}
		//upon S pressed
		if (currentKeys['s'] || currentKeys['S']) {
			if (onThePath(currentX, currentY+moveBy)) {
				currentY+=moveBy;
				hero.style.top = currentY;
			}
			animationChange('s', (wCounter), (aCounter), (sCounter), (dCounter));
			//console.log(currentX+ " "+ currentY);
			sCounter+=stepSpeed;
		}
		//upon D pressed
		if (currentKeys['d'] || currentKeys['D']) {
			if (onThePath(currentX+moveBy, currentY)) {
				currentX+=moveBy;
				hero.style.left = currentX;
			}
			animationChange('d', (wCounter), (aCounter), (sCounter), (dCounter));
			//console.log(currentX+ " "+ currentY);
			dCounter+=stepSpeed;
		}

	}, 1)

	//Back to start Menu from Map
	thirdBackButton.onclick = function() {

		anime({
			targets:'.map',
			opacity:0,
			delay:200	
		})
		//bounces the optionsMenu left to disappear
		anime({
			targets:'.map',
			translateY:0,
			duration: 1000
		})
		//gets rid of options Menu screen
		window.setTimeout(function(){
			map.style.display = 'none';
			thirdBackButtonContainer.style.display = 'none';

		}, 500)

		//transition in the Start Menu
		window.setTimeout(function(){
			startMenu.style.display = 'block'
			//drawingBoard.style.display= 'block'
			startMenu.style.opactiy = 0;
			//fades in the StartMenu
			anime({
				targets:'.startMenu',
				opacity:1,
				delay:200			
			})
			//bounces the StartMenu back right to appear
			anime({
				targets:'.startMenu',
				translateY: 0,
				duration:1000
			})
		},500)
		clearInterval(refresh);

	}

}