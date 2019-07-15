let startButton = document.getElementById('start');
let optionsButton = document.getElementById('options');
let aboutButton = document.getElementById('about');
let startMenu = document.getElementById('startMenu');
let map = document.getElementById('map');
map.className = "map";
startMenu.className = "startMenu";

map.style.display = 'none';

let buildings = ["assets/fireRed2.png", "assets/fireRed3.png", "assets/fireRed4.png",
			  	 "assets/fireRed5.png", "assets/fireRed6.png", "assets/fireRed7.png"];

let xyCanvasCoords = [
	[80, 40, 130, 215],
	[255, 40, 240, 215],
	[925, 40, 190, 195]
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

function draw() {
	for (let i = 0; i < canvases.length; i++) {
		let randBuildingImg = new Image();
		randBuildingImg.src = buildings[Math.floor(Math.random()*buildings.length)];
		randBuildingImg.onload = function() {
			randX = Math.random() * (canvases[i].width - randBuildingImg.width);
			randY = Math.random() * (canvases[i].height - randBuildingImg.height);
			ctxs[i].drawImage(randBuildingImg, randX, randY);
		}
	}
}

/*function onAllImagesLoaded(imgPaths, callback) {
	let loadedImages = [];
	for (let imgPath of imgPaths) {
		let img = new Image();
		img.src = imgPath;
		img.onload = function() {
			loadedImages.push(img);
			if (loadedImages.length >= imgPaths.length) {
				callback(loadedImages);
			}
		}
	}
}

function draw(buildings) {
	for (let i = 0; i < canvases.length; i++) {
		let buildingWidths = buildings.map(b => b.width);
		let buildingsThatFit = buildings.filter(img => img.width <= canvases[i].width);
		let buildingImg = buildingsThatFit[Math.floor(Math.random()*buildingsThatFit.length)];
		randX = Math.random() * (canvases[i].width - buildingImg.width);
		randY = Math.random() * (canvases[i].height - buildingImg.height);
		ctxs[i].drawImage(buildingImg, randX, randY);
	}
}*/

let startSwitch = false;
startButton.onclick = function() {
	startSwitch = true;
	console.log('gothere');
	
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
	
	window.setTimeout(function(){
		startMenu.style.display= 'none';
	}, 500)

	let canvas = document.createElement("canvas");
	main.appendChild(canvas);

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
	draw();
}

if (startSwitch) {
	
}