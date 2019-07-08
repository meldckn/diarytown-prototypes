
var categoryNames = [];


for (let action of actions) {
	
	if (categoryNames.indexOf(action.category)===-1) {
		categoryNames.push(action.category);
	}
}

var categories = [];

for (let categoryName of categoryNames) {
	let category = {
		name : categoryName,
		actions : []
	};
	categories.push(category);
}

function closeCategory (actionButtonDiv) {
	anime({
		targets:'.actionButton',
		opacity:0,
		duration:2000
	})
	anime({
		targets: '.actionButton',
		translateX:-150,
		duration: 2000
	})
	anime({
		targets:'.actionTextDiv',
		opacity:0,
		duration:2000
	})
	anime({
		targets: '.actionTextDiv',
		translateX:-150,
		duration: 2000
	})
	window.setTimeout(function(){
		while (actionButtonDiv.childNodes.length) {
		actionButtonDiv.removeChild(actionButtonDiv.lastChild);
		}
		actionTextDiv.innerText = "";
	}, 300);
}


let actionTextDiv = document.createElement("div");

for (let category of categories) {
	let categoryDiv = document.createElement("div");
	categoryDiv.id = category.name;


	main.appendChild(categoryDiv);

	let button = document.createElement("button");
	let space = document.createElement("br");
	categoryDiv.appendChild(button);
	categoryDiv.appendChild(space);

	let actionButtonDiv = document.createElement("div");
	actionButtonDiv.className = "actionButtonDiv";
	categoryDiv.appendChild(actionButtonDiv);


	button.innerText = category.name.toUpperCase();
	button.className = "categoryButton";


	for (let action of actions) {
		if (action.category === category.name) {
			category.actions.push(action);
		}
	}

	let isOpen = false;
	button.onclick = function() {
		let CCN = button.parentNode.id;
		isOpen =!isOpen;
		if (isOpen === true) {
			let actionButtonDivs = document.querySelectorAll('.actionButtonDiv');



			for (let ABD of actionButtonDivs) {
				if (ABD.parentNode.id === CCN) {
					continue;
				}
				closeCategory(ABD);
			}


			for (let action of category.actions) {
				let actionButton = document.createElement("button");
				
				actionButtonDiv.appendChild(actionButton);
				actionButton.innerText = action.name;
				actionButton.className = "actionButton";
				actionButton.id = action.name;

				anime({
					targets:'.actionButton',
					opacity:1,
					delay: anime.stagger(100)
				})
				anime({
  					targets: '.actionButton',
  					translateX: 150,
  					delay: anime.stagger(100) // increase delay by 100ms for each elements.
				});

				let opened = false;

				actionButton.onclick = function() {
					opened = !opened;
					if (opened) {
						

						actionTextDiv.className = "actionTextDiv";

						let alts = "Can also be represented by";
						for (let alternatives of action.text) {
							alts += ", \""+alternatives+ "\"";
						}

						let relateds = "";
						if (action.related.length === 0) {
							relateds = "No related actions."
						} else {
							relateds = "Related to";
							for (let related of action.related) {

							}
							relateds += ", \""+related+"\"";
						}

						let otherCats = "";
						if (action.othercategories === "") {
							otherCats = "No other categories."
						} else {
							otherCats = "Also categorized as, \""+action.othercategories+"\"";
						}
						
						actionTextDiv.innerText = alts + "\n" +relateds+ "\n"+ otherCats;

						let mainRect = main.getBoundingClientRect();
						let offset = mainRect.height-actionButton.offsetTop+33;
						let secOffset = (mainRect.left-actionButton.offsetLeft)+50;


						
						actionButton.dataset.vertOff=offset*-1;
						actionButton.dataset.horOff=secOffset*-1;

						console.log(actionButton.dataset.vertOff);
						console.log(actionButton.dataset.horOff);

						anime({
							targets: '#'+action.name,
							translateY:offset,
							translateX: secOffset,
							duration: 1500
						})

						anime({
							targets:'.actionTextDiv',
							opacity:1,
							delay: anime.stagger(200, {start: 750})
						})
						anime({	
							targets: '.actionTextDiv',
							translateX: 60,
							delay: anime.stagger(200, {start: 750}) // increase delay by 100ms for each elements.
						});

						actionButton.style.borderRadius = '1px';
						actionButton.style.fontSize = 20;
					} else {
						console.log(actionButton.dataset.vertOff);
						console.log(actionButton.dataset.horOff);

						anime({
							targets: '#'+action.name,
							translateY:0,
							translateX:150,
							duration: 1500
						})
						actionButton.style.borderRadius = '20px';
						actionButton.style.fontSize = 15;
						anime({
							targets:'.actionTextDiv',
							opacity:0,
							duration:2000
						})
						anime({
							targets: '.actionTextDiv',
							translateX:-150,
							duration: 2000
						})
						window.setTimeout(function(){
							actionTextDiv.innerText = "";
						}, 300);
					}	
				}
			}
		} else {
			
			closeCategory(actionButtonDiv);
		}
	}
}

footer.appendChild(actionTextDiv);




