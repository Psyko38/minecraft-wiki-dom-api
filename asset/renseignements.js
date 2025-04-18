const NavBTN = document.querySelector(".burger");
const MediaBTN = document.querySelector(".MediaBTN");
const MediaUi = document.querySelector(".media");

NavBTN.addEventListener("click", () => {
	MediaUi.style.display = "unset";
});

MediaBTN.addEventListener("click", () => {
	MediaUi.style.display = "none";
});

async function mobs() {
	const resultat = await fetch("http://192.168.1.15:3000/v1/entities/28", {
		method: "GET",
	});
	const data = await resultat.json();

	return data;
}
//74;28

const titre = document.querySelector("#titre");
const ND = document.querySelector("#nom-descipt");
const nom = document.querySelector("#nom");
const icon = document.querySelector("#icon");
const image = document.querySelector("#image");
const vie = document.querySelector("#vie");
const armure = document.querySelector("#armure");
const dega = document.querySelector("#dega");
const classe = document.querySelector("#class");
const caractaire = document.querySelector("#caractaire");
const largeur = document.querySelector("#largeur");
const longeur = document.querySelector("#longeur");
const descipt = document.querySelector("#descipt");

window.addEventListener("DOMContentLoaded", async () => {
	const data = await mobs();
	const couleur = document.querySelector(".couleur");

	console.log(data);

	titre.textContent = data.name[0].toUpperCase() + data.name.slice(1);
	ND.textContent = data.name[0].toUpperCase() + data.name.slice(1);
	nom.textContent = data.name[0].toUpperCase() + data.name.slice(1);
	icon.src = data.icon;
	image.src = data.image;
	vie.textContent = data.health;
	armure.textContent = data.armor;
	dega.textContent = data.strength;
	classe.textContent =
		data.classification[0].toUpperCase() + data.classification.slice(1);
	caractaire.textContent = data.type[0].toUpperCase() + data.type.slice(1);
	largeur.textContent = data.height;
	longeur.textContent = data.width;
	descipt.textContent = data.description;

	if (data.type == "passive") {
		couleur.classList.add("passive");
	}
	if (data.type == "neutral") {
		couleur.classList.add("neutral");
	}
	if (data.type == "hostile") {
		couleur.classList.add("hostile");
	}
});
