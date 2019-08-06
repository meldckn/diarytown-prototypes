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
let backgroundMusic = document.getElementById('backgroundMusic');
let writeNewDiary = document.getElementById('writeNewDiary');
let diaryEditor = document.getElementById('diaryEditor');
let fourthBackButton = document.getElementById('fourthBackButton');
let creatorButtons = document.getElementById('customize');
let writeNewDiaryContainer = document.getElementById('writeNewDiaryContainer');
let diaryEvents = document.getElementById('diaryEvents');
let emojiDiv = document.getElementById('emojiDiv');

//assigning classNames
map.className = "map";
thirdBackButtonContainer.className = "thirdBackButtonContainer";
thirdBackButton.className = "thirdBackButton";
startMenu.className = "startMenu";
optionsMenu.className = "optionsMenu";
aboutMenu.className = "aboutMenu";
writeNewDiary.className = "writeNewDiary";
diaryEditor.className = "diaryEditor";
fourthBackButton.className = "fourthBackButton";
creatorButtons.className = "creatorButtons";
writeNewDiaryContainer.className = 'writeNewDiaryContainer';
diaryEvents.className = "diaryEvents";

//hiding certain things from appearing right away on the start menu
map.style.display = 'none';
optionsMenu.style.display = 'none';
aboutMenu.style.display = 'none';
thirdBackButtonContainer.style.display = 'none';
diaryEditor.style.display = 'none';
fourthBackButton.style.display = 'none';
creatorButtons.style.display = 'none';
writeNewDiaryContainer.style.display = 'none';
diaryEvents.style.display = 'none';
emojiDiv.style.display = 'none';

//CANVAS COORDS
let tempCanvasCoord = [
	[1040, 300, 75, 400]
];

let extraCharacterCanvasCoords = [
	[160, 263, 50, 55],
	[328, 263, 51, 55],
	[927, 417, 190, 63],
	[470, 515, 30, 135],
	[1040, 540, 75, 160]
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
	// Bottom Middle
	[525, 660, 125, 80],
	[765, 660, 125, 80],
	// Bottom Right
	[685, 520, 120, 102],
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
	//Bottom Middle
	[485, 660], [665, 660], [695, 660], [725, 660],
	[905, 660], [935, 660], [965, 660], [995, 660],
	[485, 690], [665, 690], [695, 690], [725, 690],
	[905, 690], [935, 690], [965, 690], [995, 690],
	[485, 720], [665, 720], [695, 720], [725, 720],
	[905, 720], [935, 720], [965, 720], [995, 720]
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

function singleShuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// EXTRA CHARACTERS
let extraCharacterImages = [document.getElementById("character1"), document.getElementById("character2"),
							document.getElementById("character3"), document.getElementById("character4"),
							document.getElementById("character5")];

let extraCharactersOnSpawn = 4;
function drawCharacters() {
	let randCharacterImgs = singleShuffle(extraCharacterImages);
	let randCharacterCoords = singleShuffle(extraCharacterCanvasCoords);
	for (let i = 0; i < extraCharactersOnSpawn; i++) {
		let characters = document.createElement('div');
		characters.id = "extraCharacter" + (i+1);
		characters.className = "characters";
		randCharacterImgs[i].style.display = "block";
		characters.appendChild(randCharacterImgs[i]);
		map.appendChild(characters);

		let leftMin = randCharacterCoords[i][0];
		let leftMax = randCharacterCoords[i][0] + randCharacterCoords[i][2] - 26.5;
		let topMin = randCharacterCoords[i][1];
		let topMax = randCharacterCoords[i][1] + randCharacterCoords[i][3] - 35.3;

		// An edit to the extra female characters
		if (randCharacterImgs[i] === document.getElementById("character4") ||
			randCharacterImgs[i] === document.getElementById("character5")) {
			leftMax = randCharacterCoords[i][0] + randCharacterCoords[i][2] - 30;
			topMax = randCharacterCoords[i][1] + randCharacterCoords[i][3] - 40;
			randCharacterImgs[i].style.width = 30;
			randCharacterImgs[i].style.height = 40;
		}

		characters.style.left = Math.floor(Math.random()*(leftMax - leftMin) + leftMin);
		characters.style.top = Math.floor(Math.random()*(topMax - topMin) + topMin);

		/*Visualizing
		let c = document.createElement("canvas");
		let ctx = c.getContext("2d");
		map.insertBefore(c, map.firstChild);
		c.style.position = "absolute";
		c.style.border = "1px solid yellow";
		c.style.marginLeft = extraCharacterCanvasCoords[i][0] + "px";
		c.style.marginTop = extraCharacterCanvasCoords[i][1] + "px";
		c.width = extraCharacterCanvasCoords[i][2];
		c.height = extraCharacterCanvasCoords[i][3];*/
	}
}

//BUILDINGS
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
	buildingCanvases[i].style.position = "absolute";
	buildingCanvases[i].style.marginLeft = buildingCanvasCoords[i][0] + "px";
	buildingCanvases[i].style.marginTop = buildingCanvasCoords[i][1] + "px";
	buildingCanvases[i].style.zIndex = 3;
	buildingCanvases[i].width = buildingCanvasCoords[i][2];
	buildingCanvases[i].height = buildingCanvasCoords[i][3];
}

let copyOfBuildingCanvases = [];
let copyOfBuildingCtxs = [];
for (let i = 0; i < buildingCanvases.length; i++) {
	copyOfBuildingCanvases[i] = buildingCanvases[i];
	copyOfBuildingCtxs[i] = buildingCtxs[i];
}


let buildingsOnSpawn = 19;
let buildingScale = 1.25;
let buildingCounter = 0;
let buildingRandCanvasesAndCtxs = shuffle(buildingCanvases, buildingCtxs);
function drawBuildings() {
	for (let i = 0; i < buildingsOnSpawn; i++) {
		let randBuildingImg = buildings[Math.floor(Math.random()*buildings.length)];

		if (buildingRandCanvasesAndCtxs[0][i].width === 190 && buildingRandCanvasesAndCtxs[0][i].height === 206) {
			buildingRandCanvasesAndCtxs[1][i].clearRect(0, 0, buildingRandCanvasesAndCtxs[0][i].width,
														buildingRandCanvasesAndCtxs[0][i].height);
			randBuildingImg = specialBuildings[0];
			buildingRandCanvasesAndCtxs[0][i].style.zIndex = 6;
		} else if (buildingRandCanvasesAndCtxs[0][i].width === 145 && buildingRandCanvasesAndCtxs[0][i].height === 165) {
			buildingRandCanvasesAndCtxs[1][i].clearRect(0, 0, buildingRandCanvasesAndCtxs[0][i].width,
														buildingRandCanvasesAndCtxs[0][i].height);
			randBuildingImg = specialBuildings[1];
			buildingRandCanvasesAndCtxs[0][i].style.zIndex=8;
		} else if (buildingRandCanvasesAndCtxs[0][i].width === 335 && buildingRandCanvasesAndCtxs[0][i].height === 160) {
			buildingRandCanvasesAndCtxs[1][i].clearRect(0, 0, buildingRandCanvasesAndCtxs[0][i].width,
														buildingRandCanvasesAndCtxs[0][i].height);
			randBuildingImg = specialBuildings[2];
			buildingRandCanvasesAndCtxs[0][i].style.zIndex = 6;
		} else if (buildingRandCanvasesAndCtxs[0][i].width === 120 && buildingRandCanvasesAndCtxs[0][i].height === 102) {
			buildingRandCanvasesAndCtxs[1][i].clearRect(0, 0, buildingRandCanvasesAndCtxs[0][i].width,
														buildingRandCanvasesAndCtxs[0][i].height);
			randBuildingImg = specialBuildings[3];
			buildingRandCanvasesAndCtxs[0][i].style.zIndex = 6;
		}

		let x = buildingRandCanvasesAndCtxs[0][i].width / 2 - (randBuildingImg.width*buildingScale) / 2;
		let y = buildingRandCanvasesAndCtxs[0][i].height / 2 - (randBuildingImg.height*buildingScale) / 2;

		buildingRandCanvasesAndCtxs[1][i].imageSmoothingEnabled = false;
		buildingRandCanvasesAndCtxs[1][i].drawImage(randBuildingImg, x, y, 
													randBuildingImg.width*buildingScale, randBuildingImg.height*buildingScale);
	}
}

//FOUNTAIN
let fountainsEdited = [document.getElementById("fountain1"), document.getElementById("fountain2"),
					   document.getElementById("fountain3"), document.getElementById("fountain4"),
					   document.getElementById("fountain5")];
let fountainScale = 1.25;

let fountainCanvas = document.createElement("canvas");
let fountainCtx = fountainCanvas.getContext("2d");
map.insertBefore(fountainCanvas, map.firstChild);
fountainCanvas.style.position = "absolute";
fountainCanvas.style.imageRendering = "pixelated";
fountainCanvas.style.marginLeft = 240 + "px";
fountainCanvas.style.marginTop = 375 + "px";
fountainCanvas.style.zIndex = 3;
fountainCanvas.width = 50*fountainScale;
fountainCanvas.height = 50*fountainScale;

let fountainImg;
function drawFountain() {
	fountainImg = fountainsEdited[0];
	window.requestAnimationFrame(fountainStep);
}

let fountainFrameCounter = 0;
let fountainFrameCount = 0;
const maxWaitForFountainFrames = 9;
function fountainStep() {
	fountainFrameCount++;
	if (fountainFrameCount < maxWaitForFountainFrames) {
		window.requestAnimationFrame(fountainStep);
		return;
	}
	fountainFrameCount = 0;

	fountainImg = fountainsEdited[fountainFrameCounter];
	fountainFrameCounter++;
	if (fountainFrameCounter >= fountainsEdited.length) {
		fountainFrameCounter = 0;
	}

	let x = fountainCanvas.width / 2 - (fountainImg.width*fountainScale) / 2;
	let y = fountainCanvas.height / 2 - (fountainImg.height*fountainScale) / 2;
	fountainCtx.imageSmoothingEnabled = false;
	fountainCtx.clearRect(0, 0, fountainCanvas.width, fountainCanvas.height);
	fountainCtx.drawImage(fountainImg, x, y, 
						  fountainImg.width*fountainScale, fountainImg.height*fountainScale);

	window.requestAnimationFrame(fountainStep);
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
	flowerCanvases[i].style.imageRendering = "pixelated";
	flowerCanvases[i].style.marginLeft = flowerCanvasCoords[i][0] + "px";
	flowerCanvases[i].style.marginTop = flowerCanvasCoords[i][1] + "px";
	flowerCanvases[i].style.zIndex = 3;
	flowerCanvases[i].width = 25;
	flowerCanvases[i].height = 25;
}

let flowerScale = 0.181;
let flowersOnSpawn = 95;
let flowerImg;
let flowerRandCanvasesAndCtxs = shuffle(flowerCanvases, flowerCtxs);

function drawFlowers() {
	flowerImg = flowersEdited[0];
	window.requestAnimationFrame(flowerStep);
}

let flowerFrameCounter = 0;
let flowerFrameCount = 0;
const maxWaitForFlowerFrames = 33;
function flowerStep() {
	flowerFrameCount++;
	if (flowerFrameCount < maxWaitForFlowerFrames) {
		window.requestAnimationFrame(flowerStep);
		return;
	}
	flowerFrameCount = 0;

	flowerImg = flowersEdited[flowerFrameCounter];
	flowerFrameCounter++;
	if (flowerFrameCounter >= flowersEdited.length) {
		flowerFrameCounter = 0;
	}

	for (i = 0; i < flowersOnSpawn; i++) {
		let x = flowerRandCanvasesAndCtxs[0][i].width / 2 - (flowerImg.width*flowerScale) / 2;
		let y = flowerRandCanvasesAndCtxs[0][i].height / 2 - (flowerImg.height*flowerScale) / 2;
		flowerRandCanvasesAndCtxs[1][i].imageSmoothingEnabled = false;
		flowerRandCanvasesAndCtxs[1][i].clearRect(0, 0, flowerRandCanvasesAndCtxs[0][i].width, flowerRandCanvasesAndCtxs[0][i].height);
		flowerRandCanvasesAndCtxs[1][i].drawImage(flowerImg, x, y, 
												  flowerImg.width*flowerScale, flowerImg.height*flowerScale);
	}
	window.requestAnimationFrame(flowerStep);
}

//TREES
let treeCanvases = [];
let treeCtxs = [];
for (let i = 0; i < treeCanvasCoords.length; i++) {
	treeCanvases[i] = document.createElement("canvas");
	treeCtxs[i] = treeCanvases[i].getContext("2d");
	map.insertBefore(treeCanvases[i], map.firstChild);
	treeCanvases[i].style.position = "absolute";
	treeCanvases[i].style.imageRendering = "pixelated";
	treeCanvases[i].style.marginLeft = treeCanvasCoords[i][0] + "px";
	treeCanvases[i].style.marginTop = treeCanvasCoords[i][1] + "px";
	treeCanvases[i].style.zIndex = 6;
	treeCanvases[i].width = 55;
	treeCanvases[i].height = 65;
}

let treeScale = 0.175;
let treesOnSpawn = 21;
let treeRandCanvasesAndCtxs = shuffle(treeCanvases, treeCtxs);
function drawTrees() {
	for (let i = 0; i < treesOnSpawn; i++) {
		let treeImg = document.getElementById("tree");
		let x = treeRandCanvasesAndCtxs[0][i].width / 2 - (treeImg.width*treeScale) / 2;
		let y = treeRandCanvasesAndCtxs[0][i].height - (treeImg.height*treeScale);
		treeRandCanvasesAndCtxs[1][i].imageSmoothingEnabled = false;
		treeRandCanvasesAndCtxs[1][i].drawImage(treeImg, x, y, treeImg.width*treeScale, treeImg.height*treeScale);
	}
}

// TOGGLE CANVAS BORDERS
function toggleCanvasBorders() {
	if (document.getElementById("checkbox").checked) {
		for (let i = 0; i < buildingCanvases.length; i++) {
			buildingCanvases[i].style.border = "1px solid red";
		}
		for (let i = 0; i < flowerCanvases.length; i++) {
			flowerCanvases[i].style.border = "1px solid purple";
		}
		for (let i = 0; i < treeCanvases.length; i++) {
			treeCanvases[i].style.border = "1px solid green";
		}
		fountainCanvas.style.border = "1px solid blue";
	} else if (!(document.getElementById("checkbox").checked)) {
		for (let i = 0; i < buildingCanvases.length; i++) {
			buildingCanvases[i].style.border = "none";
		}
		for (let i = 0; i < flowerCanvases.length; i++) {
			flowerCanvases[i].style.border = "none";
		}
		for (let i = 0; i < treeCanvases.length; i++) {
			treeCanvases[i].style.border = "none";
		}
		fountainCanvas.style.border = "none";
	}
}

// TOWN CUSTOMIZATION
let canvasCleared = [];
for (let i = 0; i < buildingCanvasCoords.length; i++) {
	canvasCleared[i] = false;
}
let background = document.getElementById('background');

function deleteItem() {
	window.onclick = function(e) {
		let mouseEvent = window.event || e;
		let mouseX = mouseEvent.clientX;
		let mouseY = mouseEvent.clientY;
		let position = background.getBoundingClientRect();

		let mapDistortionX = position.left;
		let mapDistortionY = position.top;

		//console.log(mouseX-mapDistortionX);
		//console.log(mouseY-mapDistortionY);

		for (let i = 0; i < buildingCanvasCoords.length; i++) {
			let x = buildingCanvasCoords[i][0];
			let y = buildingCanvasCoords[i][1];
			let width = buildingCanvasCoords[i][2];
			let height = buildingCanvasCoords[i][3];
			if ((mouseX-mapDistortionX > x && mouseX-mapDistortionX < x+width) 
				&& (mouseY-mapDistortionY > y && mouseY-mapDistortionY < y+height) && !canvasCleared[i]) {
				copyOfBuildingCtxs[i].clearRect(0, 0, copyOfBuildingCanvases[i].width,
										  		copyOfBuildingCanvases[i].height);
				canvasCleared[i] = true;
				//console.log("Hit the building canvas");
				break;
			}
		}
	}
}

function addBuilding1() {
	window.onclick = function(e) {
		let mouseEvent = window.event || e;
		let mouseX = mouseEvent.clientX;
		let mouseY = mouseEvent.clientY;
		let position = background.getBoundingClientRect();

		let mapDistortionX = position.left;
		let mapDistortionY = position.top;

		//console.log(mouseX-mapDistortionX);
		//console.log(mouseY-mapDistortionY);

		for (let i = 0; i < buildingCanvasCoords.length; i++) {
			let x = buildingCanvasCoords[i][0];
			let y = buildingCanvasCoords[i][1];
			let width = buildingCanvasCoords[i][2];
			let height = buildingCanvasCoords[i][3];
			if ((mouseX-mapDistortionX > x && mouseX-mapDistortionX < x+width) 
				&& (mouseY-mapDistortionY > y && mouseY-mapDistortionY < y+height) && canvasCleared[i]) {
				let newX = copyOfBuildingCanvases[i].width / 2 - (buildings[0].width*buildingScale) / 2;
				let newY = copyOfBuildingCanvases[i].height / 2 - (buildings[0].height*buildingScale) / 2;

				copyOfBuildingCtxs[i].imageSmoothingEnabled = false;
				copyOfBuildingCtxs[i].drawImage(buildings[0], newX, newY, 
										  		buildings[0].width*buildingScale, buildings[0].height*buildingScale);
				canvasCleared[i] = false;
				//console.log("Hit the building canvas");
				break;
			}
		}
	}
}

function addBuilding2() {
	window.onclick = function(e) {
		let mouseEvent = window.event || e;
		let mouseX = mouseEvent.clientX;
		let mouseY = mouseEvent.clientY;
		let position = background.getBoundingClientRect();

		let mapDistortionX = position.left;
		let mapDistortionY = position.top;

		//console.log(mouseX-mapDistortionX);
		//console.log(mouseY-mapDistortionY);

		for (let i = 0; i < buildingCanvasCoords.length; i++) {
			let x = buildingCanvasCoords[i][0];
			let y = buildingCanvasCoords[i][1];
			let width = buildingCanvasCoords[i][2];
			let height = buildingCanvasCoords[i][3];
			if ((mouseX-mapDistortionX > x && mouseX-mapDistortionX < x+width) 
				&& (mouseY-mapDistortionY > y && mouseY-mapDistortionY < y+height) && canvasCleared[i]) {
				let newX = copyOfBuildingCanvases[i].width / 2 - (buildings[1].width*buildingScale) / 2;
				let newY = copyOfBuildingCanvases[i].height / 2 - (buildings[1].height*buildingScale) / 2;

				copyOfBuildingCtxs[i].imageSmoothingEnabled = false;
				copyOfBuildingCtxs[i].drawImage(buildings[1], newX, newY, 
										  		buildings[1].width*buildingScale, buildings[1].height*buildingScale);
				canvasCleared[i] = false;
				//console.log("Hit the building canvas");
				break;
			}
		}
	}
}

function addBuilding3() {
	window.onclick = function(e) {
		let mouseEvent = window.event || e;
		let mouseX = mouseEvent.clientX;
		let mouseY = mouseEvent.clientY;
		let position = background.getBoundingClientRect();

		let mapDistortionX = position.left;
		let mapDistortionY = position.top;

		//console.log(mouseX-mapDistortionX);
		//console.log(mouseY-mapDistortionY);

		for (let i = 0; i < buildingCanvasCoords.length; i++) {
			let x = buildingCanvasCoords[i][0];
			let y = buildingCanvasCoords[i][1];
			let width = buildingCanvasCoords[i][2];
			let height = buildingCanvasCoords[i][3];
			if ((mouseX-mapDistortionX > x && mouseX-mapDistortionX < x+width) 
				&& (mouseY-mapDistortionY > y && mouseY-mapDistortionY < y+height) && canvasCleared[i]) {
				let newX = copyOfBuildingCanvases[i].width / 2 - (buildings[2].width*buildingScale) / 2;
				let newY = copyOfBuildingCanvases[i].height / 2 - (buildings[2].height*buildingScale) / 2;

				copyOfBuildingCtxs[i].imageSmoothingEnabled = false;
				copyOfBuildingCtxs[i].drawImage(buildings[2], newX, newY, 
										  		buildings[2].width*buildingScale, buildings[2].height*buildingScale);
				canvasCleared[i] = false;
				//console.log("Hit the building canvas");
				break;
			}
		}
	}
}

function addBuilding4() {
	window.onclick = function(e) {
		let mouseEvent = window.event || e;
		let mouseX = mouseEvent.clientX;
		let mouseY = mouseEvent.clientY;
		let position = background.getBoundingClientRect();

		let mapDistortionX = position.left;
		let mapDistortionY = position.top;

		//console.log(mouseX-mapDistortionX);
		//console.log(mouseY-mapDistortionY);

		for (let i = 0; i < buildingCanvasCoords.length; i++) {
			let x = buildingCanvasCoords[i][0];
			let y = buildingCanvasCoords[i][1];
			let width = buildingCanvasCoords[i][2];
			let height = buildingCanvasCoords[i][3];
			if ((mouseX-mapDistortionX > x && mouseX-mapDistortionX < x+width) 
				&& (mouseY-mapDistortionY > y && mouseY-mapDistortionY < y+height) && canvasCleared[i]) {
				let newX = copyOfBuildingCanvases[i].width / 2 - (buildings[3].width*buildingScale) / 2;
				let newY = copyOfBuildingCanvases[i].height / 2 - (buildings[3].height*buildingScale) / 2;

				copyOfBuildingCtxs[i].imageSmoothingEnabled = false;
				copyOfBuildingCtxs[i].drawImage(buildings[3], newX, newY, 
										  		buildings[3].width*buildingScale, buildings[3].height*buildingScale);
				canvasCleared[i] = false;
				//console.log("Hit the building canvas");
				break;
			}
		}
	}
}

function addBuilding5() {
	window.onclick = function(e) {
		let mouseEvent = window.event || e;
		let mouseX = mouseEvent.clientX;
		let mouseY = mouseEvent.clientY;
		let position = background.getBoundingClientRect();

		let mapDistortionX = position.left;
		let mapDistortionY = position.top;

		//console.log(mouseX-mapDistortionX);
		//console.log(mouseY-mapDistortionY);

		for (let i = 0; i < buildingCanvasCoords.length; i++) {
			let x = buildingCanvasCoords[i][0];
			let y = buildingCanvasCoords[i][1];
			let width = buildingCanvasCoords[i][2];
			let height = buildingCanvasCoords[i][3];
			if ((mouseX-mapDistortionX > x && mouseX-mapDistortionX < x+width) 
				&& (mouseY-mapDistortionY > y && mouseY-mapDistortionY < y+height) && canvasCleared[i]) {
				let newX = copyOfBuildingCanvases[i].width / 2 - (buildings[4].width*buildingScale) / 2;
				let newY = copyOfBuildingCanvases[i].height / 2 - (buildings[4].height*buildingScale) / 2;

				copyOfBuildingCtxs[i].imageSmoothingEnabled = false;
				copyOfBuildingCtxs[i].drawImage(buildings[4], newX, newY, 
										  		buildings[4].width*buildingScale, buildings[4].height*buildingScale);
				canvasCleared[i] = false;
				//console.log("Hit the building canvas");
				break;
			}
		}
	}
}

// DIARY EVENTS AND SIFTING PATTERNS
let emoji = document.createElement('p');
let emojiQueue = [];
let attitudeTowardsSelfCounter = 0;
let popularityCounter = 0;
let workloadCounter = 0;


let attitudeTowardsSelfEmojiDiv = document.getElementById('attitudeTowardsSelfEmojiDiv');
let popularityEmojiDiv = document.getElementById('popularityEmojiDiv');
let workloadEmojiDiv = document.getElementById('workloadEmojiDiv');

document.getElementById('attitudeTowardsSelf').appendChild(attitudeTowardsSelfEmojiDiv);
document.getElementById('popularity').appendChild(popularityEmojiDiv);
document.getElementById('workload').appendChild(workloadEmojiDiv);

// Initial character ratings
let initialAttitudeTowardsSelfEmoji = document.createElement('p');
initialAttitudeTowardsSelfEmoji.className = "siftingEffectEmoji";
attitudeTowardsSelfEmojiDiv.appendChild(initialAttitudeTowardsSelfEmoji);
initialAttitudeTowardsSelfEmoji.innerText = "😀";

let initialPopularityEmoji = document.createElement('p');
initialPopularityEmoji.className = "siftingEffectEmoji";
popularityEmojiDiv.appendChild(initialPopularityEmoji);
initialPopularityEmoji.innerText = "🎉";

let initialWorkloadEmoji = document.createElement('p');
initialWorkloadEmoji.className = "siftingEffectEmoji";
workloadEmojiDiv.appendChild(initialWorkloadEmoji);
initialWorkloadEmoji.innerText = "📚";



//Defining increase and decrease in ratings
function attitudeTowardsSelfIncrease () {
	attitudeTowardsSelfCounter += 1;
	let attitudeTowardsSelfEmoji = document.createElement('p');
	attitudeTowardsSelfEmoji.className = "siftingEffectEmoji";
	attitudeTowardsSelfEmojiDiv.appendChild(attitudeTowardsSelfEmoji);
	attitudeTowardsSelfEmoji.innerText = "😀";
}
function attitudeTowardsSelfDecrease () {
	if (attitudeTowardsSelfCounter > 0) {
		attitudeTowardsSelfCounter -= 1;
		attitudeTowardsSelfEmojiDiv.removeChild(attitudeTowardsSelfEmojiDiv.lastChild);
	}
}
function popularityIncrease () {
	popularityCounter += 1;
	let popularityEmoji = document.createElement('p');
	popularityEmoji.className = "siftingEffectEmoji";
	popularityEmojiDiv.appendChild(popularityEmoji);
	popularityEmoji.innerText = "🎉";
}
function popularityDecrease () {
	if (popularityCounter > 0) {
		popularityCounter -= 1;
		popularityEmojiDiv.removeChild(popularityEmojiDiv.lastChild);
	}
}
function workloadIncrease () {
	workloadCounter += 1;
	let workloadEmoji = document.createElement('p');
	workloadEmoji.className = "siftingEffectEmoji";
	workloadEmojiDiv.appendChild(workloadEmoji);
	workloadEmoji.innerText = "📚";
}
function workloadDecrease () {
	if (workloadCounter > 0) {
		workloadCounter -= 1;
		workloadEmojiDiv.removeChild(workloadEmojiDiv.lastChild);
	}
}

//Handles automatic events and diary entries, including sifting patterns
Sim.registerEventHandler(function(event) {
	emoji.className = "emoji";
	hero.appendChild(emoji);

	if (event.isDiaryEvent) {
		emojiQueue.push(Diary.getActionById(event.eventType).emoji);
		diaryEvents.innerHTML += (event.text + "<br></br>");
	} else {
		let autoEmoji = event.text.split(/\s+/)[0];
		emojiQueue.push(autoEmoji);
		diaryEvents.innerHTML += (event.text.split(/\s+/).slice(1).join(" ") + "<br></br>");
	}

	// To perform story sifting every time a new event takes place...
	let newNuggets = Sim.runSiftingPatterns();
	for (let nugget of newNuggets) {
		if (nugget.pattern.name === 'movedAndMissingSomeone') {
			attitudeTowardsSelfDecrease();
		}
		if (nugget.pattern.name === 'readAndGoodIdea') {
			attitudeTowardsSelfIncrease();
		}
		if (nugget.pattern.name === 'wentToPartyAndDinedOut') {
			popularityIncrease();
		}
		if (nugget.pattern.name === 'hobbyAndExercised') {
			attitudeTowardsSelfIncrease();
		}
		if (nugget.pattern.name === 'niceConvoAndHeardFrom') {
			popularityIncrease();
		}
		if (nugget.pattern.name === 'playGameAndAvoidResponsibility') {
			attitudeTowardsSelfDecrease();
			workloadIncrease();
		}
		if (nugget.pattern.name === 'gotHelpAndFinishedWork') {
			popularityIncrease();
			workloadDecrease();
			attitudeTowardsSelfIncrease();
		}
		if (nugget.pattern.name === 'shoppedAndFeltExcited') {
			attitudeTowardsSelfIncrease();
		}
		if (nugget.pattern.name === 'wentHomeAndWatchedTV') {
			attitudeTowardsSelfIncrease();
			workloadIncrease();
		}
		if (nugget.pattern.name === 'daydreamedAndDidNothing') {
			attitudeTowardsSelfDecrease();
			workloadIncrease();
		}
		if (nugget.pattern.name === 'helpedSomeoneAndNiceConvo') {
			attitudeTowardsSelfIncrease();
		}
		if (nugget.pattern.name === 'hungOutAndChattedWithSomeone') {
			attitudeTowardsSelfIncrease();
		}
		if (nugget.pattern.name === 'meditatedAndAdventures') {
			attitudeTowardsSelfIncrease();
		}
		if (nugget.pattern.name === 'wasProductiveAndWentToAMeeting') {
			workloadDecrease();
		}
		if (nugget.pattern.name === 'avoidedResponsibilityAndDidNothing') {
			workloadIncrease();
		}
		if (nugget.pattern.name === 'sickAndMessedUp') {
			attitudeTowardsSelfDecrease();
		}
		if (nugget.pattern.name === 'studiedAndWasProductive') {
			workloadDecrease();
		}
		if (nugget.pattern.name === 'internetedAndDidNothing') {
			workloadIncrease();
		}
		if (nugget.pattern.name === 'productiveAndWorkMeeting') {
			workloadDecrease();
		}
		if (nugget.pattern.name === 'hurtSelfAndMessedUp') {
			attitudeTowardsSelfDecrease();
		}
		if (nugget.pattern.name === 'hobbyAndMeditated') {
			workloadIncrease();
			attitudeTowardsSelfIncrease();
		}
		if (nugget.pattern.name === 'choresAndWentToMeeting') {
			workloadDecrease();
		}
		if (nugget.pattern.name === 'fightAndAngryWithMe') {
			attitudeTowardsSelfDecrease();
			popularityDecrease();
		}
		if (nugget.pattern.name === 'choresAndWentToClass') {
			workloadDecrease();
		}
		if (nugget.pattern.name === 'chattedWithSomeoneAndSomeoneBothered') {
			attitudeTowardsSelfDecrease();
		}
		if (nugget.pattern.name === 'chattedWithSomeoneAndSomeoneWasJerk') {
			attitudeTowardsSelfDecrease();
		}
		if (nugget.pattern.name === 'chattedWithSomeoneAndWasMean') {
			attitudeTowardsSelfDecrease();
			popularityDecrease();
		}
		if (nugget.pattern.name === 'vacationedAndAdventured') {
			attitudeTowardsSelfIncrease();
		}
		if (nugget.pattern.name === 'tvAndLazy') {
			workloadIncrease();
		}
		if (nugget.pattern.name === 'playedGamesAndLazy') {
			workloadIncrease();
		}
		if (nugget.pattern.name === 'playedGamesAndTV') {
			workloadIncrease();
		}
		if (nugget.pattern.name === 'sleptInAndLazy') {
			workloadIncrease();
		}
		if (nugget.pattern.name === 'sleptInAndTV') {
			workloadIncrease();
		}
		if (nugget.pattern.name === 'sleptInAndPlayedGames') {
			workloadIncrease();
		}
		if (nugget.pattern.name === 'visitedPeopleAndHungOutWith') {
			popularityIncrease();
		}
		console.log("Attitude Towards Self: " + attitudeTowardsSelfCounter);
		console.log("Popularity: " + popularityCounter);
		console.log("Workload: " + workloadCounter);
	}
});
window.setInterval(function(event) {
	if (emojiQueue.length === 0) {
		emoji.innerText = "";
		return;
	}
	emoji.innerText = emojiQueue[0];
	emojiQueue.shift();
}, 1000 * 3);
window.setInterval(function(){
	Sim.runRandomAction();
}, 1000 * 10);








//Start of character animating thing

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

//True=Short Hair; False=Long Hair
let characterGender = true;
//Based on the gender parameter, initializes the MainCharacterAnimations array with 12 Image frames of 
//the long hair character sprite or 12 of the short hair character.
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
}

//calls the InitFrames function if the Options Menu's Gender Toggle has been clicked
function changeGender() {
	if (document.getElementById("genderToggle").checked) {
		initFrames(false);
	}
	if (!(document.getElementById("genderToggle").checked)) {
		initFrames(true);
	}
}

//mutes the audio HTML element if the Options Menu's Music Toggle has been clicked
function turnOffMusic() {
	if (document.getElementById("musicToggle").checked) {
		music.muted = true;
		backgroundMusic.muted = true;
	}
	if (!(document.getElementById("musicToggle").checked)) {
		music.muted = false;
		backgroundMusic.muted = false;

	}
}

//initializes Hero, and assigns starting position of Hero div
let hero = document.createElement('div');
function drawHero() {
	hero.className = "hero";
	hero.id = "mainPlayer";
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
			hero.insertBefore(mainCharacterAnimations[9], hero.firstChild);
		}
		//neutral step
		if (wCounter%20 === 0) {
			hero.removeChild(hero.childNodes[0]);
			hero.insertBefore(mainCharacterAnimations[10], hero.firstChild);
		}
		//right step
		if (wCounter%40 === 3) {
			hero.removeChild(hero.childNodes[0]);
			hero.insertBefore(mainCharacterAnimations[11], hero.firstChild);
		}
	}
	//walking left
	if (input === 'a') {
		//left step
		if (aCounter%40 === 1) {
			hero.removeChild(hero.childNodes[0]);
			hero.insertBefore(mainCharacterAnimations[3], hero.firstChild);
		}
		//neutral step
		if (aCounter%20 === 0) {
			hero.removeChild(hero.childNodes[0]);
			hero.insertBefore(mainCharacterAnimations[4], hero.firstChild);
		}
		//right step
		if (aCounter%40 === 3) {
			hero.removeChild(hero.childNodes[0]);
			hero.insertBefore(mainCharacterAnimations[5], hero.firstChild);
		}
	}
	//walking down
	if (input === 's') {
		//left step
		if (sCounter%40 === 1) {
			hero.removeChild(hero.childNodes[0]);
			hero.insertBefore(mainCharacterAnimations[0], hero.firstChild);
		}
		//neutral step
		if (sCounter%20 === 0) {
			hero.removeChild(hero.childNodes[0]);
			hero.insertBefore(mainCharacterAnimations[1], hero.firstChild);
		}
		//right step
		if (sCounter%40 === 3) {
			hero.removeChild(hero.childNodes[0]);
			hero.insertBefore(mainCharacterAnimations[2], hero.firstChild);
		}
	}
	//walking right
	if (input === 'd') {
		//left step
		if (dCounter%40 === 1) {
			hero.removeChild(hero.childNodes[0]);
			hero.insertBefore(mainCharacterAnimations[6], hero.firstChild);
		}
		//neutral step
		if (dCounter%20 === 0) {
			hero.removeChild(hero.childNodes[0]);
			hero.insertBefore(mainCharacterAnimations[7], hero.firstChild);
		}
		//right step
		if (dCounter%40 === 3) {
			hero.removeChild(hero.childNodes[0]);
			hero.insertBefore(mainCharacterAnimations[8], hero.firstChild);
		}
	}
}

//changes the Hero's z-index based on 2D y-value on Map; places Hero sprite in front of
//or behind the buildings - basic 3D effect
function checkZ(x, y) {
	if (y<=132) {
		hero.style.zIndex = 7;
	}
	if (y<=281 && y>132) {
		hero.style.zIndex = 5;
	}
	if (y>281 && y<=484) {
		hero.style.zIndex = 7;
	}
	if (y>484 && y<=572) {
		hero.style.zIndex = 5;
	}
	if (y>572) {
		hero.style.zIndex = 7;
	}
}

function atHome(x,y) {
	if ((x>267 && x<321) && y<270) {
		return true;
	}
	return false;
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

//map music turned off
music.pause();


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
let onTheMapPage = false;
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
	}, 500)

	
	//transitions in the town map
	window.setTimeout(function(){
		map.style.display = 'block';
		creatorButtons.style.display = 'block';
		thirdBackButtonContainer.style.display = 'block';
		diaryEvents.style.display = 'block';
		emojiDiv.style.display = 'block';
		map.style.opacity = 0;
		emojiDiv.style.opacity = 0;
		//fades in the map
		anime({
			targets:'.map',
			opacity:1,
			delay:200			
		})
		anime({
			targets:'.emojiDiv',
			opacity:1,
			delay:200			
		})
		//bounces the map down to appear
		anime({
			targets:'.map',
			translateY: 75,
			duration:1000
		})
		anime({
			targets:'.emojiDiv',
			translateY: 75,
			duration:1000
		})
		//starts the map music, pauses background Music
		backgroundMusic.pause();
		music.currentTime = 0;
		music.play();
	},500)

	//accounts for a possible pressing of the GenderToggle button in the options menu
	changeGender();

	//checks if this is the first time the Start button was pressed; if not, retains the original
	//map, with the same buildings and Hero positions.
	if (!alreadyDrawn) {
		//draws hero
		drawHero();
		//draws buildings
		drawBuildings();
		//draws flowers
		drawFlowers();
		//draws fountain
		drawFountain();
		//draws trees
		drawTrees();
		//draw extra characters
		drawCharacters();
		alreadyDrawn = true;
	}

	//movement of Hero via W-A-S-D keys
	let wCounter = 2;
	let aCounter = 2;
	let sCounter = 2;
	let dCounter = 2;

	onTheMapPage = true;
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
		checkZ(currentX, currentY);
		if (atHome(currentX, currentY) && onTheMapPage) {
			writeNewDiaryContainer.style.display = 'block';
		} else {
			writeNewDiaryContainer.style.display = 'none';
		}

	}, 1)

	//Back to start Menu from Map
	thirdBackButton.onclick = function() {

		anime({
			targets:'.map',
			opacity:0,
			delay:200	
		})
		anime({
			targets:'.emojiDiv',
			opacity:0,
			delay:200	
		})
		//bounces the map left to disappear
		anime({
			targets:'.map',
			translateY:0,
			duration: 1000
		})
		anime({
			targets:'.emojiDiv',
			translateY:0,
			duration: 1000
		})
		//gets rid of map screen
		window.setTimeout(function(){
			map.style.display = 'none';
			thirdBackButtonContainer.style.display = 'none';
			creatorButtons.style.display = 'none';
			writeNewDiaryContainer.style.display = 'none';
			diaryEvents.style.display = 'none';
			emojiDiv.style.display = 'none';

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

		//starts the background music, pauses map music
		music.pause();
		backgroundMusic.currentTime = 0;
		backgroundMusic.play();

	}

	//brings in the diaryEditor page and transitions out the Map
	writeNewDiary.onclick = function() {
		onTheMapPage = false;
		anime({
			targets:'.map',
			opacity:0,
			delay:200	
		})
		anime({
			targets:'.emojiDiv',
			opacity:0,
			delay:200	
		})
		//bounces the map left to disappear
		anime({
			targets:'.map',
			translateY:0,
			duration: 1000
		})
		anime({
			targets:'.emojiDiv',
			translateY:0,
			duration: 1000
		})
		//gets rid of map screen
		window.setTimeout(function(){
			map.style.display = 'none';
			thirdBackButton.style.display = 'none';
			creatorButtons.style.display = 'none';
			writeNewDiaryContainer.style.display = 'none';
			diaryEvents.style.display = 'none';
			emojiDiv.style.display = 'none';
		}, 500)

		//transition in the diary Editor
		window.setTimeout(function(){
			diaryEditor.style.display = 'block'
			fourthBackButton.style.display = 'block';
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

		fourthBackButton.onclick = function() {
			onTheMapPage = true;
			anime({
				targets:'.diaryEditor',
				opacity:0,
				delay:200	
			})
			//bounces the diaryEditor left to disappear
			anime({
				targets:'.diaryEditor',
				translateY:0,
				duration: 1000
			})
			//gets rid of diaryEditor screen
			window.setTimeout(function(){
				diaryEditor.style.display = 'none';
				fourthBackButton.style.display = 'none';
			}, 500)

			//transition in the Map 
			window.setTimeout(function(){
				map.style.display = 'block'
				map.style.opacity = 0;
				thirdBackButton.style.display = 'block';
				creatorButtons.style.display = 'block';
				diaryEvents.style.display = 'block';
				emojiDiv.style.display = 'block';
				emojiDiv.style.opacity = 0;
				//fades in the Map
				anime({
					targets:'.map',
					opacity:1,
					delay:200			
				})
				anime({
					targets:'.emojiDiv',
					opacity:1,
					delay:200			
				})
				//bounces the Map back right to appear
				anime({
					targets:'.map',
					translateY: 75,
					duration:1000
				})
				anime({
					targets:'.emojiDiv',
					translateY: 75,
					duration:1000
				})
			},500)

		}

	}
}

//contains the code to be run when the MakeNewDiary button is pressed
function runDiaryEditor() {
//document.getElementById("defaultOpen").click();

}

function openCategory(categoryName) {
	//console.log(document.getElementById(categoryName).style.display === "none", document.getElementById(categoryName).style.display === "none");
	
	if( getComputedStyle(document.getElementById(categoryName), null).display === "block" )
	{		
		document.getElementById(categoryName).style.display = "none";
	}

	else
	{
		document.getElementById(categoryName).style.display = "block";
	}
}

function search() {
	let actionsEventsPhrases = document.getElementById("actions-events-phrases");
	let input = document.getElementById("searchInput");

	for (let i = 0; i < phrases.length; i++) {
		for (let j = 0; j < phrases[i].text.length; j++) {
			if (phrases[i].text[j].toUpperCase().indexOf(input.value.toUpperCase()) > -1) {
				document.getElementById(phrases[i].id).style.display = "block";
				break;
			} else {
				document.getElementById(phrases[i].id).style.display = "none";
			}
		}
	}
}


