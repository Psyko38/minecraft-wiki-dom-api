const params = new URLSearchParams(window.location.search);
const paramsObj = Object.fromEntries(params.entries());

API = "http://51.38.232.174:3000";

async function mobs(q) {
  const resultat = await fetch(`${API}/v1/entities/${q}`, {
    method: "GET",
  });
  const data = await resultat.json();

  return data;
}

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
  const data = await mobs(paramsObj.q);
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

  const name = data.name;
  const mobName = name[0].toUpperCase() + name.slice(1);
  const descriptionParts = data.description.split(mobName.toLowerCase());
  const descriptionHtml = descriptionParts.join(`<span>${mobName}</span>`);

  descipt.innerHTML = descriptionHtml;

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
