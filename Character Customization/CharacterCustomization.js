let img = new Image();
img.src = "./CharacterModel.png";
img.onload = function() {
	init();
}
let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");



const scale = 0.3;
const width = 320;
const height = 480;
const scaledWidth = scale * width;
const scaledHeight = scale * height;

function drawFrame(frameX, frameY, canvasX, canvasY) {
	ctx.drawImage(img,
				  frameX * width, frameY * height, width, height,
				  canvasX, canvasY, scaledWidth, scaledHeight);
}



const cycleLoop = [0, 2, 1, 3];
let currentLoopIndex = 0;
let frameCount = 0;
let waitFramesToDrawNext = 10;
let currentDirection = 0;

function step() {
	frameCount++;
	if (frameCount < waitFramesToDrawNext) {
		window.requestAnimationFrame(step);
		return;
	}
	frameCount = 0;

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawFrame(0, cycleLoop[currentLoopIndex], 0, 0);
	currentLoopIndex++

	if (currentLoopIndex >= cycleLoop.length) {
		currentLoopIndex = 0;
	}
	window.requestAnimationFrame(step);
}



function init() {
	window.requestAnimationFrame(step);
}