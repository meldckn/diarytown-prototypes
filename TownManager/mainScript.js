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


let canvas = document.getElementById("canvas");
canvas.style.marginLeft = "80px";
canvas.style.marginTop = "40px";
canvas.width = 1040;
canvas.height = 700;
let ctx = canvas.getContext("2d");

let xyCanvasCoords = [ [80, 40, 130, 215],
					   [255, 40, 240, 215],
					   [925, 40, 190, 195]
					 ];

let randBuildingImg = new Image();
randBuildingImg.src = buildings[Math.floor(Math.random()*buildings.length)];


function draw() {
	randX = Math.random() * (canvas.width - randBuildingImg.width);
	randY = Math.random() * (canvas.height - randBuildingImg.height);
	ctx.drawImage(randBuildingImg, randX, randY);
}


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