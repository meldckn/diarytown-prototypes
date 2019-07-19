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

//CANVAS COORDS
let buildingCanvasCoords = [
	// Top Left
	[80, 70, 125, 80],
	[80, 180, 125, 80],
	[255, 70, 125, 80],
	[255, 180, 125, 80],
	// Top Middle
	[440, 40, 125, 80],
	[440, 180, 125, 80],
	[640, 40, 125, 80],
	[640, 180, 125, 80],
	[810, 40, 125, 80],
	[810, 180, 125, 80],
	// Top Right
	[930, 110, 125, 80],
	// Bottom Left
	[95, 520, 125, 80],
	[95, 630, 125, 80],
];
let flowerCanvasCoords = [
	// Top Left
	[80, 40], [110, 40], [140, 40], [170, 40],
	[200, 40], [230, 40], [260, 40], [290, 40],
	[320, 40], [350, 40], [380, 40], [410, 40],
	[85, 153], [115, 153], [145, 153], [175, 153],
	[260, 153], [290, 153], [320, 153], [350, 153],
	// Top Middle
	[560, 40], [590, 40], [620, 40],
	[760, 40], [760, 235], [790, 40], [790, 235],
	// Top Right
	[930, 40], [930, 70], [930, 210],
	[960, 40], [960, 70], [960, 210],
	[990, 40], [990, 70], [990, 210],
	[1020, 40], [1020, 70], [1020, 210],
	[1050, 40], [1050, 70], [1050, 210],
	[1080, 40], [1080, 70], [1080, 210],
	// Bottom Left
	[100, 603], [130, 603], [160, 603], [190, 603],
	[100, 713], [130, 713], [160, 713], [190, 713],
	[280, 683], [310, 683], [340, 683], [370, 683],
	[400, 683], [430, 683], [460, 683], [490, 683],
	[280, 713], [310, 713], [340, 713], [370, 713],
	[400, 713], [430, 713], [460, 713], [490, 713],
	// Bottom Middle and Right
	[520, 683], [550, 683],
	[520, 713], [550, 713], [580, 713], [610, 713],
	[640, 713], [670, 713], [700, 713], [730, 713],
	[850, 683], [880, 683], [910, 683], [940, 683],
	[970, 683], [1000, 683], [1030, 683],
	[760, 713], [790, 713], [820, 713], [850, 713],
	[880, 713], [910, 713], [940, 713], [970, 713],
	[1000, 713], [1030, 713],
];
let treeCanvasCoords = [
	// Top Left
	[383, 55], [383, 175], [383, 115], [443, 115],
	// Top Middle
	[575, 55], [760, 55], [760, 165],
	// Top Right
	[1060, 145], [1060, 85],
	// Bottom Middle
	[577, 645], [620, 645], [663, 645], 
	[706, 645], [749, 645], [792, 645],
];


//SHUFFLE FUNCTION
function shuffle(a, b) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
        [b[i], b[j]] = [b[j], b[i]];
    }
    return [a, b];
}




//BUILDINGS
let buildings = ["assets/fireRed2Edited.png", "assets/fireRed3Edited.png", "assets/fireRed4Edited.png",
			  	 "assets/fireRed5Edited.png", "assets/fireRed6Edited.png", "assets/fireRed7Edited.png",
			  	 /*"assets/fireRed10Edited.png", "assets/fireRed11Edited.png", "assets/fireRed14Edited.png", 
			  	 "assets/fireRed16Edited.png"*/];
let buildingCanvases = [];
let buildingCtxs = [];
for (let i = 0; i < buildingCanvasCoords.length; i++) {
	buildingCanvases[i] = document.createElement("canvas");
	buildingCtxs[i] = buildingCanvases[i].getContext("2d");
	map.insertBefore(buildingCanvases[i], map.firstChild);
	buildingCanvases[i].style.border = "1px solid red";
	buildingCanvases[i].style.position = "absolute";
	buildingCanvases[i].style.marginLeft = buildingCanvasCoords[i][0] + "px";
	buildingCanvases[i].style.marginTop = buildingCanvasCoords[i][1] + "px";
	buildingCanvases[i].width = buildingCanvasCoords[i][2];
	buildingCanvases[i].height = buildingCanvasCoords[i][3];
}


let buildingsOnSpawn = 100;
let buildingScale = 1.25;
function drawBuildings() {
	for (let i = 0; i < buildingsOnSpawn; i++) {
		let randCanvasesAndCtxs = shuffle(buildingCanvases, buildingCtxs);
		let randBuildingImg = new Image();
		randBuildingImg.src = buildings[Math.floor(Math.random()*buildings.length)];
		randBuildingImg.onload = function() {
			let x = randCanvasesAndCtxs[0][i].width / 2 - (randBuildingImg.width*buildingScale) / 2;
			let y = randCanvasesAndCtxs[0][i].height / 2 - (randBuildingImg.height*buildingScale) / 2;
			randCanvasesAndCtxs[1][i].imageSmoothingEnabled = false;
			randCanvasesAndCtxs[1][i].drawImage(randBuildingImg, x, y, 
												randBuildingImg.width*buildingScale, randBuildingImg.height*buildingScale);
		}
	}
}




//FLOWERS
let flowers = ["assets/flower1Edited.png", "assets/flower2Edited.png", "assets/flower3Edited.png"];

let flowerCanvases = [];
let flowerCtxs = [];
for (let i = 0; i < flowerCanvasCoords.length; i++) {
	flowerCanvases[i] = document.createElement("canvas");
	flowerCtxs[i] = flowerCanvases[i].getContext("2d");
	map.insertBefore(flowerCanvases[i], map.firstChild);
	flowerCanvases[i].style.position = "absolute";
	flowerCanvases[i].style.border = "1px solid purple";
	flowerCanvases[i].style.imageRendering = "pixelated";
	flowerCanvases[i].style.marginLeft = flowerCanvasCoords[i][0] + "px";
	flowerCanvases[i].style.marginTop = flowerCanvasCoords[i][1] + "px";
	flowerCanvases[i].width = 25;
	flowerCanvases[i].height = 25;
}


let flowerScale = 0.181;
let flowersOnSpawn = 100;
let flowerImg;
function drawFlowers() {
	for (let i = 0; i < flowersOnSpawn; i++) {
		let randCanvasesAndCtxs = shuffle(flowerCanvases, flowerCtxs);
		flowerImg = new Image();
		flowerImg.src = flowers[0];
		flowerImg.onload = function() {
			let x = randCanvasesAndCtxs[0][i].width / 2 - (flowerImg.width*flowerScale) / 2;
			let y = randCanvasesAndCtxs[0][i].height / 2 - (flowerImg.height*flowerScale) / 2;
			randCanvasesAndCtxs[1][i].imageSmoothingEnabled = false;
			randCanvasesAndCtxs[1][i].drawImage(flowerImg, x, y, 
												flowerImg.width*flowerScale, flowerImg.height*flowerScale);
			//requestAnimationFrame(step);
		}
	}
}

/*let animationDuration = 300;
let timePerFrame = animationDuration / flowers.length;
let timeWhenLastUpdate;
let timeFromLastUpdate;
let frameNumber = 0;
function step(startTime) {
	if (!timeWhenLastUpdate) {
		timeWhenLastUpdate = startTime;
	}
	timeFromLastUpdate = startTime - timeWhenLastUpdate;

	if (timeFromLastUpdate > timePerFrame) {
		flowerImg.src = flowers[frameNumber];
		timeWhenLastUpdate = startTime;

    	if (frameNumber >= flowers.length) {
    		frameNumber = 0;
    	} else {
    		frameNumber++;
    	}        
	}
	requestAnimationFrame(step);
}*/




//TREES
let treeCanvases = [];
let treeCtxs = [];
for (let i = 0; i < treeCanvasCoords.length; i++) {
	treeCanvases[i] = document.createElement("canvas");
	treeCtxs[i] = treeCanvases[i].getContext("2d");
	map.insertBefore(treeCanvases[i], map.firstChild);
	treeCanvases[i].style.position = "absolute";
	treeCanvases[i].style.border = "1px solid green";
	treeCanvases[i].style.imageRendering = "pixelated";
	treeCanvases[i].style.marginLeft = treeCanvasCoords[i][0] + "px";
	treeCanvases[i].style.marginTop = treeCanvasCoords[i][1] + "px";
	treeCanvases[i].width = 55;
	treeCanvases[i].height = 65;
}

let treeScale = 0.175;
let treesOnSpawn = 100;
function drawTrees() {
	for (let i = 0; i < treesOnSpawn; i++) {
		let randCanvasesAndCtxs = shuffle(treeCanvases, treeCtxs);
		let treeImg = new Image();
		treeImg.src = "assets/tree.png";
		treeImg.onload = function() {
			let x = randCanvasesAndCtxs[0][i].width / 2 - (treeImg.width*treeScale) / 2;
			let y = randCanvasesAndCtxs[0][i].height - (treeImg.height*treeScale);
			randCanvasesAndCtxs[1][i].imageSmoothingEnabled = false;
			randCanvasesAndCtxs[1][i].drawImage(treeImg, x, y, 
												treeImg.width*treeScale, treeImg.height*treeScale);
		}
	}
}

// TOGGLE CANVAS BORDERS
function toggleCanvasBorders() {
	if (document.getElementById("checkbox").checked) {
		for (let i = 0; i < buildingCanvases.length; i++) {
			buildingCanvases[i].style.border = "none";
		}
		for (let i = 0; i < flowerCanvases.length; i++) {
			flowerCanvases[i].style.border = "none";
		}
		for (let i = 0; i < treeCanvases.length; i++) {
			treeCanvases[i].style.border = "none";
		}
	} else if (!(document.getElementById("checkbox").checked)) {
		for (let i = 0; i < buildingCanvases.length; i++) {
			buildingCanvases[i].style.border = "1px solid red";
		}
		for (let i = 0; i < flowerCanvases.length; i++) {
			flowerCanvases[i].style.border = "1px solid purple";
		}
		for (let i = 0; i < treeCanvases.length; i++) {
			treeCanvases[i].style.border = "1px solid green";
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
		map.style.opacity = 0;
		//fades in the map
		anime({
			targets:'.map',
			opacity:1,
			delay:200			
		})
		//bounces the map down to appear
		anime({
			targets:'.map',
			translateY: 77,
			duration:1000
		})
		
	},500)

	if (!alreadyDrawn) {
		//draws hero
		drawHero();	
		//draws buildings
		drawBuildings();
		//draws flowers
		drawFlowers();
		//draws trees
		drawTrees();
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