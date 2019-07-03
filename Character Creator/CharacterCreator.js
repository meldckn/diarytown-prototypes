let imageNames = ["1Char", "2Char", "3Char"];

let command = document.getElementById("command");
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
	command.innerText = "Choose a Name For Your Character"
	nameField = document.createElement("input");
	nameField.setAttribute("type", "text");
	nameField.setAttribute("placeholder", "Enter your name...");

	nameField.className = "styledTextFields";

	document.body.appendChild(nameField);

	nameField.onchange = function() {
		nameField.style.display = "none";
		charName = nameField.value;
		document.getElementById("charStatus").innerText += "Name: " + charName;


		command.innerText = "Choose an Age For Your Character"
		ageField = document.createElement("input");
		ageField.setAttribute("type", "text");
		ageField.setAttribute("placeholder", "Enter your age...");

		ageField.className = "styledTextFields";

		document.body.appendChild(ageField);

		ageField.onchange = function() {
			ageField.style.display = "none";
			charAge = ageField.value;
			document.getElementById("charStatus").innerText += "\n Age: " + charAge;
		}
	}
}

function chooseTraits() {
	
}

chooseSprite();