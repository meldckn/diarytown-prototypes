
var categoryNames = [];


for (let action of actions) {
	
	if (categoryNames.indexOf(action.category)===-1) {
		categoryNames.push(action.category);
	}
}

function closeCategory (category) {
	category.open = !category.open;
	let actionButtonDiv = category.actionButtonDiv;

	
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
	console.log("closed");
	window.setTimeout(function(){
		while (actionButtonDiv.childNodes.length) {
		actionButtonDiv.removeChild(actionButtonDiv.lastChild);
		}
		actionTextDiv.innerText = "";

	}, 200);
}

function closeAction(actionButton) {
	console.log(actionButton.dataset.vertOff);
	console.log(actionButton.dataset.horOff);

	anime({
		targets: '#'+actionButton.id,
		translateY:0,
		translateX:150,
		duration: 600
	})
	actionButton.style.borderRadius = '20px';
	actionButton.style.fontSize = 15;
	anime({
		targets:'.actionTextDiv',
		opacity:0,
		duration:1500
	})
	anime({
		targets: '.actionTextDiv',
		translateX:-150,
		duration: 1500
	})
	window.setTimeout(function(){
		actionTextDiv.innerText = "";
	}, 300);
}

function getCategoryByName(name) {
	for (let category of categories) {
		if (category.name === name) {
			return category;
		}
	}
	console.error('no category with name '+ name);
}

let categories = [];

for (let categoryName of categoryNames) {
	let category = {
		name : categoryName,
		actions : [],
		open: false,
		htmlElement: null
	};
	categories.push(category);
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

	category.actionButtonDiv = actionButtonDiv;


	button.innerText = category.name.toUpperCase();
	button.className = "categoryButton";


	for (let action of actions) {
		if (action.category === category.name) {
			category.actions.push(action);
		}
	}

	let isOpen = false;
	button.onclick = function() {


		let CurrentCategoryN = button.parentNode.id;

		let category = getCategoryByName(CurrentCategoryN);
		

		
		if (!category.open) {
			let actionButtonDivs = document.querySelectorAll('.actionButtonDiv');
			// is an array of HTML elements

			
			for (let categoryy of categories) {
				if (!categoryy.open || categoryy.name===CurrentCategoryN) {
					continue;
				}
				closeCategory(categoryy);

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
					delay: anime.stagger(25, {easing: 'easeOutQuad'})
				})
				anime({
  					targets: '.actionButton',
  					translateX: 150,
  					delay: anime.stagger(25, {easing: 'easeOutQuad'}) // increase delay by 100ms for each elements.
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
								relateds += ", \""+related+"\"";
							}

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
							duration: 1000,
						})

						anime({
							targets:'.actionTextDiv',
							opacity:1,
							delay: anime.stagger(300, {start: 300})
						})
						anime({	
							targets: '.actionTextDiv',
							translateX: 60,
							delay: anime.stagger(300, {start: 300}) // increase delay by 100ms for each elements.
						});

						actionButton.style.borderRadius = '1px';
						actionButton.style.fontSize = 20;
					} else {
						closeAction(actionButton);
					}	
				}
			}
			category.open = !category.open;
		} else {
			
			closeCategory(category);
		}
		
	}
}

footer.appendChild(actionTextDiv);



