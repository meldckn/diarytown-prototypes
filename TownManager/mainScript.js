let startButton = document.getElementById('start');
let optionsButton = document.getElementById('options');
let aboutButton = document.getElementById('about');
let startMenu = document.getElementById('startMenu');
let map = document.getElementById('map');
map.className = "map";
startMenu.className = "startMenu";

map.style.display = 'none';



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
	
}

if (startSwitch) {
	
}