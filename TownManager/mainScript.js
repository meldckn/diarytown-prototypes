let startButton = document.getElementById('start');
let optionsButton = document.getElementById('options');
let aboutButton = document.getElementById('about');
let startMenu = document.getElementById('startMenu');
let map = document.getElementById('map');
map.className = "map";
startMenu.className = "startMenu";

map.style.display = 'none';


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












let startSwitch = false;
startButton.onclick = function() {
	startSwitch = true;
	console.log('gothere');
	
	//transitions out all of the title screen 
	anime({
		targets:'.startMenu',
		opacity:0,
		delay:200	
	})
	anime({
		targets:'.startMenu',
		translateY:-100,
		duration: 1000
	})
	
	//gets rid of title screen
	window.setTimeout(function(){
		startMenu.style.display= 'none';
	}, 500)

	
	//transitions in the town map
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
			translateY: 77,
			duration:1000
		})
		
	},500)

	//draws
	drawBuildings();
	drawFlowers();
	drawTrees();
}