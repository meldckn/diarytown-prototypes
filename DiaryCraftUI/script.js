
let buttonclicked = true;
let mybutton = document.getElementById('mybutton');
mybutton.onclick = function() {
		if(buttonclicked){
			buttonclicked = false;
			document.body.style.background = 'red';}
			else{buttonclicked = true;
			document.body.style.background = 'rgb(255,255,153)';}
		};

		let myinput = document.getElementById('myinput');
		myinput.onchange = function(){
		let newvalue = (myinput.value);
		if(myinput.value === 'hi'){
		}
		let myoutput = document.getElementById('output');
		output.innerText += newvalue +'\n';
		myinput.value = '';
		};
		let isKeyDown = false;
		window.onkeydown = function(event){
			if(!isKeyDown){
			isKeyDown = true;
			console.log(event);
			}
		};

window.onkeyup = function() {
	console.log(event);
}
//get mouse coordinate on click and place circles there
function showCoords(event) {
  var xcoord = event.clientX;
  var ycoord = event.clientY;
  circle.style.left = xcoord;
  circle.style.top = ycoord;
  console.log(xcoord);

}
window.onmousemove = function(event){
	showCoords(event);

}





//initializing the toggle button
let buttonstate = true;
let rightbutton = document.getElementById('togglebutton');
togglebutton.onclick = function stop(){
	buttonstate = !buttonstate;

}
//moving the box
let currentX = 0;
let currentY = 0;
let squareContainer = document.getElementById ('square-container');
let containerStyle = window.getComputedStyle( squareContainer);
let maxX = parseInt(containerStyle.width.replace('px', ''));
let maxY = parseInt(containerStyle.height.replace('px', ''));
let minX = 0;
let minY = 0;
let moveDirection = 'right';

window.setInterval(function(){
	if(buttonstate === false) return;
	if(moveDirection === 'right'){
		square.style.left = currentX;
		currentX++;
	}
	else if(moveDirection === 'down'){
		square.style.top = currentY;
		currentY++;
	}
	else if(moveDirection === 'left'){
		square.style.left = currentX;
		currentX--;
	}
	else if(moveDirection === 'up'){
		square.style.top = currentY;
		currentY--;
	}




	if(currentX === maxX && currentY === maxY){
		moveDirection = 'left';
	} else if (currentX === maxX && currentY === minY){
		moveDirection = 'down';
	} else if (currentX === minX && currentY === maxY){
		moveDirection = 'up';
	} else if (currentX === minX && currentY === minY) {
		moveDirection = 'right';
	}
}, 1);
