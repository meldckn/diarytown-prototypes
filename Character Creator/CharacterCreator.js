let imageNames = ["1Char", "2Char", "3Char"];

let command = document.getElementById("command");
let charStatus = document.getElementById("charStatus");
let charName;
let charAge;

let traitNames = ["Trait_Active", "Trait_AtPeace", "Trait_Cheerful", 
				  "Trait_Creative", "Trait_DramaQueen", "Trait_Emo"];

function chooseSprite() {
	for (let imageName of imageNames) {
		let img = document.createElement("img");
		img.setAttribute("src", imageName + ".png");
		img.id = imageName;
		img.style.width = "115px";
		img.style.height = "115px";
		if (imageName === "3Char") {
			img.style.width = "175px";
			img.style.height = "175px";
		}

		img.onclick = function() {
			for (let anotherImageName of imageNames) {
				if (imageName === anotherImageName) {
					continue;
				} else {
					let otherImg = document.getElementById(anotherImageName);
					otherImg.style.display = "none";
				}
			}
			chooseNameAndAge();
		}
		document.getElementById("spriteContainer").appendChild(img);
	}
}

function chooseNameAndAge() {
	command.innerText = "Choose a Name For Your Character";
	nameField = document.createElement("input");
	nameField.setAttribute("type", "text");
	nameField.setAttribute("placeholder", "Enter your name...");

	nameField.className = "styledTextFields";

	document.body.appendChild(nameField);

	nameField.onchange = function() {
		nameField.style.display = "none";
		charName = nameField.value;
		charStatus.innerText += "Name: " + charName;
		charStatus.style.fontSize = "17px";
		charStatus.style.fontWeight = "bold";
		charStatus.style.marginBottom = "10px";
		charStatus.style.marginLeft = "0px";

		command.innerText = "Choose an Age For Your Character";
		ageField = document.createElement("input");
		ageField.setAttribute("type", "text");
		ageField.setAttribute("placeholder", "Enter your age...");

		ageField.className = "styledTextFields";

		document.body.appendChild(ageField);

		ageField.onchange = function() {
			ageField.style.display = "none";
			charAge = ageField.value;
			charStatus.innerText += "\n Age: " + charAge;
			chooseTraits();
		}
	}
}

function chooseTraits() {
	command.innerText = "Choose 3 Traits That Suit Your Character";
	for (let traitName of traitNames) {
		let img = document.createElement("img");
		img.setAttribute("src", traitName + ".png");
		img.id = traitName;

		img.className = "styledTraits";

		if (traitName === traitNames[0]) {
			img.style.marginLeft = "0px";
		}

		document.getElementById("traitContainer").appendChild(img);

		img.onclick = function() {
			charStatus.appendChild(img);
			document.getElementById("traitContainer").getElementsByTagName("img")[0].style.marginLeft = "0px";
		}
	}
}

chooseSprite();