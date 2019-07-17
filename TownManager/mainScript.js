let startButton = document.getElementById('start');
let optionsButton = document.getElementById('options');
let aboutButton = document.getElementById('about');
let startMenu = document.getElementById('startMenu');
let map = document.getElementById('map');
map.className = "map";
startMenu.className = "startMenu";

map.style.display = 'none';

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

//start of character animating thing

//front1-2-3, left1-2-3, right 1-2-3, back1-2-3
let mainCharacterAnimationAddresses = ["assets/frame1Edited.png", "assets/frame2Edited.png", 
"assets/frame3Edited.png", "assets/frame4Edited.png", "assets/frame5Edited.png", 
"assets/frame6Edited.png", "assets/frame7Edited.png", "assets/frame8Edited.png",
"assets/frame9Edited.png", "assets/frame10Edited.png", "assets/frame11Edited.png",
"assets/frame12Edited.png"];



let mainCharacterAnimations = [];
for (let i = 0; i<mainCharacterAnimationAddresses.length; i++) {
	let tempFrame = new Image();
	tempFrame.src = mainCharacterAnimationAddresses[i];
	mainCharacterAnimations.push(tempFrame);
}

for (let eachFrame of mainCharacterAnimations) {
	//eachFrame.style.imageRendering = "pixelated";
}

let drawingBoard = document.createElement("canvas");
drawingBoard.className = "drawingBoard";
main.appendChild(drawingBoard);
drawingBoard.style.display = 'none';




function drawHero() {
	drawingBoard.imageSmoothingEnabled = false;
	drawingBoard.getContext("2d").drawImage(mainCharacterAnimations[0], 50, 50, 25, 35);
	console.log(mainCharacterAnimations[0].width+" "+mainCharacterAnimations[0].height);
	
}	


window.setInterval(function(event) {

})





















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
		drawingBoard.style.display= 'block'
		map.style.opactiy = 0;
		anime({
			targets:'.map',
			opacity:1,
			delay:200			
		})
	
		anime({
			targets:'.map',
			translateY: 93,
			duration:1000
		})
		
	},500)

	//draws buildings
	draw();
	console.log("character");
	drawHero();


}