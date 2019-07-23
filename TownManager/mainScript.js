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
let writeNewDiary = document.getElementById('writeNewDiary');
let diaryEditor = document.getElementById('diaryEditor');

//assigning classNames
map.className = "map";
thirdBackButtonContainer.className = "thirdBackButtonContainer";
thirdBackButton.className = "thirdBackButton";
startMenu.className = "startMenu";
optionsMenu.className = "optionsMenu";
aboutMenu.className = "aboutMenu";
writeNewDiary.className = "writeNewDiary";
diaryEditor.className = "diaryEditor";

//hiding certain things from appearing right away on the start menu
map.style.display = 'none';
optionsMenu.style.display = 'none';
aboutMenu.style.display = 'none';
thirdBackButtonContainer.style.display = 'none';
diaryEditor.style.display = 'none';


//Akhil's Building management code below:

//CANVAS COORDS
let extraCharacterCanvasCoords = [
	[927, 415, 107, 65]
];

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
	[95, 635, 125, 80],
	[320, 485, 145, 165],
	// Center
	[452, 275, 190, 206],
	// Middle Right
	[700, 321, 335, 160],
	// Bottom Right
	[685, 520, 120, 102]
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
	[100, 605], [130, 605], [160, 605], [190, 605],
	[100, 720], [130, 720], [160, 720], [190, 720],
	[305, 660], [335, 660], [365, 660], [395, 660], [425, 660], [455, 660],
	[305, 690], [335, 690], [365, 690], [395, 690], [425, 690], [455, 690],
	[305, 720], [335, 720], [365, 720], [395, 720], [425, 720], [455, 720],
	/* Bottom Middle (Lags the Game)
	[485, 660], [515, 660], [545, 660], [575, 660], [605, 660], [635, 660],
	[665, 660], [695, 660], [725, 660], [755, 660], [785, 660], [815, 660],
	[845, 660], [875, 660], [905, 660], [935, 660], [965, 660], [995, 660],
	[485, 690], [515, 690], [545, 690], [575, 690], [605, 690], [635, 690],
	[665, 690], [695, 690], [725, 690], [755, 690], [785, 690], [815, 690],
	[845, 690], [875, 690], [905, 690], [935, 690], [965, 690], [995, 690],
	[485, 720], [515, 720], [545, 720], [575, 720], [605, 720], [635, 720],
	[665, 720], [695, 720], [725, 720], [755, 720], [785, 720], [815, 720],
	[845, 720], [875, 720], [905, 720], [935, 720], [965, 720], [995, 720],*/
];
let treeCanvasCoords = [
	// Top Left
	[383, 55], [383, 175], [383, 115], [443, 115],
	// Top Middle
	[575, 55], [760, 55], [760, 165],
	// Top Right
	[1060, 145], [1060, 85],
	// Bottom Right
	[625, 555], [808, 555], [851, 555],
	[894, 555], [937, 555], [980, 555],
	[625, 515], [808, 515], [851, 515],
	[894, 515], [937, 515], [980, 515]
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




// EXTRA CHARACTERS
let extraCharacterImages = ["assets/frame2Edited.png"];
let extraCharacters = [];
for (let i = 0; i < extraCharacterImages.length; i++) {
	let img = new Image();
	img.src = extraCharacterImages[i];
	extraCharacters.push(img);
}

function drawCharacters() {
	for (let i = 0; i < extraCharacters.length; i++) {
		let characters = document.createElement('div');
		characters.id = "extraCharacter" + (i+1);
		characters.className = "characters";
		characters.appendChild(extraCharacters[i]);
		map.appendChild(characters);

		let leftMin = extraCharacterCanvasCoords[i][0];
		let leftMax = extraCharacterCanvasCoords[i][0] + extraCharacterCanvasCoords[i][2] - 25;
		let topMin = extraCharacterCanvasCoords[i][1];
		let topMax = extraCharacterCanvasCoords[i][1] + extraCharacterCanvasCoords[i][3] - 35;

		characters.style.left = Math.floor(Math.random()*(leftMax - leftMin) + leftMin);
		characters.style.top = Math.floor(Math.random()*(topMax - topMin) + topMin);
		
		// Debugging
		let c = document.createElement("canvas");
		let ctx = c.getContext("2d");
		map.insertBefore(c, map.firstChild);
		c.style.position = "absolute";
		c.style.border = "1px solid yellow";
		c.style.marginLeft = extraCharacterCanvasCoords[i][0] + "px";
		c.style.marginTop = extraCharacterCanvasCoords[i][1] + "px";
		c.width = extraCharacterCanvasCoords[i][2];
		c.height = extraCharacterCanvasCoords[i][3];
	}
}




//BUILDINGS
/*let buildings = ["assets/fireRed2Edited.png", "assets/fireRed3Edited.png", "assets/fireRed4Edited.png",
			  	 "assets/fireRed5Edited.png", "assets/fireRed7Edited.png"];
let specialBuildings = ["assets/fireRed10Edited.png", "assets/fireRed11Edited.png", "assets/fireRed14Edited.png", 
						"assets/rubySaph1Edited.png"];*/
let buildings = [document.getElementById("building1"), document.getElementById("building2"), document.getElementById("building3"),
				 document.getElementById("building4"), document.getElementById("building5")];
let specialBuildings = [document.getElementById("specialBuilding1"), document.getElementById("specialBuilding2"),
						document.getElementById("specialBuilding3"), document.getElementById("specialBuilding4")];

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


let buildingsOnSpawn = 17;
let buildingScale = 1.25;
let buildingCounter = 0;
function drawBuildings() {
	let randCanvasesAndCtxs = shuffle(buildingCanvases, buildingCtxs);
	for (let i = 0; i < buildingsOnSpawn; i++) {
		let randBuildingImg = buildings[Math.floor(Math.random()*buildings.length)];

		if (randCanvasesAndCtxs[0][i].width === 190 && randCanvasesAndCtxs[0][i].height === 206) {
			randCanvasesAndCtxs[1][i].clearRect(0, 0, randCanvasesAndCtxs[0][i].width, randCanvasesAndCtxs[0][i].height);
			randBuildingImg = specialBuildings[0];
		} else if (randCanvasesAndCtxs[0][i].width === 145 && randCanvasesAndCtxs[0][i].height === 165) {
			randCanvasesAndCtxs[1][i].clearRect(0, 0, randCanvasesAndCtxs[0][i].width, randCanvasesAndCtxs[0][i].height);
			randBuildingImg = specialBuildings[1];
		} else if (randCanvasesAndCtxs[0][i].width === 335 && randCanvasesAndCtxs[0][i].height === 160) {
			randCanvasesAndCtxs[1][i].clearRect(0, 0, randCanvasesAndCtxs[0][i].width, randCanvasesAndCtxs[0][i].height);
			randBuildingImg = specialBuildings[2];
		} else if (randCanvasesAndCtxs[0][i].width === 120 && randCanvasesAndCtxs[0][i].height === 102) {
			randCanvasesAndCtxs[1][i].clearRect(0, 0, randCanvasesAndCtxs[0][i].width, randCanvasesAndCtxs[0][i].height);
			randBuildingImg = specialBuildings[3];
		}

		let x = randCanvasesAndCtxs[0][i].width / 2 - (randBuildingImg.width*buildingScale) / 2;
		let y = randCanvasesAndCtxs[0][i].height / 2 - (randBuildingImg.height*buildingScale) / 2;

		randCanvasesAndCtxs[1][i].imageSmoothingEnabled = false;
		randCanvasesAndCtxs[1][i].drawImage(randBuildingImg, x, y, 
											randBuildingImg.width*buildingScale, randBuildingImg.height*buildingScale);
	}
}




//FLOWERS
let flowersEdited = [document.getElementById("flower1"), document.getElementById("flower2"), document.getElementById("flower3")]

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
let flowersOnSpawn = 71;
let flowerImg;
let flowerRandCanvasesAndCtxs = shuffle(flowerCanvases, flowerCtxs);
function drawFlowers() {
	flowerImg = flowersEdited[0];
	window.requestAnimationFrame(step);
}


let frameCounter = 0;
let frameCount = 0;
const maxWaitForFrames = 25;
function step() {
	frameCount++;
	if (frameCount < maxWaitForFrames) {
		window.requestAnimationFrame(step);
		return;
	}
	frameCount = 0;

	flowerImg = flowersEdited[frameCounter];
	frameCounter++;
	if (frameCounter >= flowersEdited.length) {
		frameCounter = 0;
	}

	for (i = 0; i < flowersOnSpawn; i++) {
		let x = flowerRandCanvasesAndCtxs[0][i].width / 2 - (flowerImg.width*flowerScale) / 2;
		let y = flowerRandCanvasesAndCtxs[0][i].height / 2 - (flowerImg.height*flowerScale) / 2;
		flowerRandCanvasesAndCtxs[1][i].imageSmoothingEnabled = false;
		flowerRandCanvasesAndCtxs[1][i].clearRect(0, 0, flowerRandCanvasesAndCtxs[0][i].width, flowerRandCanvasesAndCtxs[0][i].height);
		flowerRandCanvasesAndCtxs[1][i].drawImage(flowerImg, x, y, 
												  flowerImg.width*flowerScale, flowerImg.height*flowerScale);
	}
	window.requestAnimationFrame(step);
}



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
let treesOnSpawn = 21;
function drawTrees() {
	let randCanvasesAndCtxs = shuffle(treeCanvases, treeCtxs);
	for (let i = 0; i < treesOnSpawn; i++) {
		let treeImg = document.getElementById("tree");
		let x = randCanvasesAndCtxs[0][i].width / 2 - (treeImg.width*treeScale) / 2;
		let y = randCanvasesAndCtxs[0][i].height - (treeImg.height*treeScale);
		randCanvasesAndCtxs[1][i].imageSmoothingEnabled = false;
		randCanvasesAndCtxs[1][i].drawImage(treeImg, x, y, treeImg.width*treeScale, treeImg.height*treeScale);
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

let mainCharacteressAnimationAddresses = ["assets/female1Edited.png", "assets/female2Edited.png", "assets/female3Edited.png",
"assets/female4Edited.png","assets/female5Edited.png","assets/female6Edited.png","assets/female7Edited.png","assets/female8Edited.png",
"assets/female9Edited.png","assets/female10Edited.png","assets/female11Edited.png","assets/female12Edited.png",];


//initializes the animation array that contains an Image element for each Hero movement frame
let mainCharacterAnimations = [];

let characterGender = true;
function initFrames(gender) {
	mainCharacterAnimations = [];
	if (gender === true) {
		for (let i = 0; i<mainCharacterAnimationAddresses.length; i++) {
			let tempFrame = new Image();
			tempFrame.src = mainCharacterAnimationAddresses[i];
			mainCharacterAnimations.push(tempFrame);
		}
	} else {
		for (let i = 0; i<mainCharacterAnimationAddresses.length; i++) {
			let tempFrame = new Image();
			tempFrame.src = mainCharacteressAnimationAddresses[i];
			mainCharacterAnimations.push(tempFrame);
		}
	}
	console.log("got here");
}

let redoSwitch = false;
function changeGender() {
	if (document.getElementById("genderToggle").checked) {
		initFrames(false);
	}
	if (!(document.getElementById("genderToggle").checked)) {
		initFrames(true);
	}
	redoSwitch = true;
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
	hero.style.left = 367;
	hero.style.top = 400;
}

//collision detection function, goes through every possible x value and defines y value boundaries
function onThePath(x, y) {
	//Currently set for 1640 x 975 display
	let offShift = 203;
	if (x<244-offShift) {
		return false;
	} 
	if (x>1374-offShift){
		return false;
	}
	if (y>689) {
		return false;
	}
	if (y<45) {
		return false;
	}
	if ((x>=244-offShift && x<303-offShift) && (y<416 || y>461)) {
		return false;		
	}
	if ((x>=303-offShift && x<334-offShift) && (y<237 || y>461)) {
		return false;
	}
	if ((x>=334-offShift && x<361-offShift) && (y<299 || y>461)) {
		return false;
	}
	if ((x>=361-offShift && x<374-offShift) && (y<299 || y>478)) {
		return false;
	}
	if ((x>=374-offShift && x <415-offShift) && (y<299 || ((y>319 && y<437)||(y>478)))) {
		return false;
	}
	if ((x>=415-offShift && x<424-offShift) && ((y>319 && y<437)||(y>478))) {
		return false;
	}
	if ((x>=424-offShift && x<438-offShift) && ((y<299 || (y>319 && y<437)||(y>478)))) {
		return false;
	}
	if ((x>=438-offShift && x<450-offShift) && (y<299 ||((y>319 && y<437)||(y>689)))) {
		return false;
	}
	if ((x>=450-offShift && x<492-offShift) && (y<299 || ((y>319 && y<437) || y>478))) {
		return false;
	}
	if ((x>=492-offShift && x<503-offShift) && (y<237 || ((y>319 && y<437) || y>478))) {
		return false;
	}
	if ((x>=503-offShift && x<542-offShift) && (y<299 || ((y>319 && y<437) || y>478))) {
		return false;
	}
	if ((x>=542-offShift && x<581-offShift) && (y<299 || y>478)) {
		return false;
	}
	if ((x>=581-offShift && x<614-offShift) && (y<237 || y>478)) {
		return false;
	}
	if ((x>=614-offShift && x<702-offShift) && (y<237 || ((y>281 && y<453) || y>478))) {
		return false;
	}
	if ((x>=702-offShift && x<791-offShift) && (((y<94) || (y>139 && y<237)) || ((y>281 && y<453) || y>617))) {
		return false;
	}
	if ((x>=791-offShift && x<793-offShift) && (y<94 || ((y>281 && y<453) || y>617))) {
		return false;
	}
	if ((x>=793-offShift && x<803-offShift) && ((y<94||(y>281 && y<453)) || ((y>499 && y<595)||y>617))) {
		return false;
	}
	if ((x>=803-offShift && x<854-offShift) && ((((y<94)||(y>139 && y<237)) || ((y>281 && y<453)||(y>499 && y<595))) || y>617)) {
		return false;
	}
	if ((x>=854-offShift && x<868-offShift) && ((((y<94 || (y>139 && y<237)) || (y>499 && y<595))) || y>617)) {
		return false;
	}
	if ((x>=868-offShift && x<1094-offShift) && ((((y<94)||(y>139 && y<237)) || ((y>281 && y<453)||(y>499 && y<595))) || y>617)) {
		return false;
	}
	if ((x>=1094-offShift && x<1140-offShift) && ((y<237||(y>281 && y<453)) || ((y>499 && y<595)|| y>617))) {
		return false;
	}
	if ((x>=1140-offShift && x<1213-offShift) && ((y<216||(y>281 && y<453)) || ((y>499 && y<595)|| y>617))) {
		return false;
	}
	if ((x>=1213-offShift && x<=1374-offShift) && (y<216 || y>261)) {
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
let currentX = 367;
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
			translateY: 75,
			duration:1000
		})
		
	},500)

	changeGender();
	/*if (redoSwitch) {
		drawHero();
	}
	*/
	if (!alreadyDrawn) {
		//draws hero
		drawHero();	
		//draws buildings
		drawBuildings();
		//draws flowers
		drawFlowers();
		//draws trees
		drawTrees();
		//drawCharacters
		drawCharacters();
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
		//bounces the map left to disappear
		anime({
			targets:'.map',
			translateY:0,
			duration: 1000
		})
		//gets rid of map screen
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

	//brings in the diaryEditor page and transitions out the Map
	writeNewDiary.onclick = function() {
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
		}, 500)

		//transition in the diary Editor
		window.setTimeout(function(){
			diaryEditor.style.display = 'block'
			diaryEditor.style.opactiy = 0;
			//fades in the diary Editor
			anime({
				targets:'.diaryEditor',
				opacity:1,
				delay:200			
			})
			//bounces the diary Editor in to appear
			anime({
				targets:'.diaryEditor',
				translateY: 75,
				duration:1000
			})
		},500)


		runDiaryEditor();
		clearInterval(refresh);

	}
}

//contains the code to be run when the MakeNewDiary button is pressed
function runDiaryEditor() {

}