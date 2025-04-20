const form = document.querySelector("form");
const formInput = form.querySelectorAll("input");
const formSelect = form.querySelectorAll("select");
let DivResult = document.querySelector(".result");
const main = document.querySelector("main");
const errDiv = document.querySelector(".err");

const API = "http://51.38.232.174:3000";

const params = new URLSearchParams(window.location.search);
const paramsObj = Object.fromEntries(params.entries());

window.addEventListener("load", async function () {
  console.log(paramsObj.q);
  if (paramsObj.q) {
    await Search(paramsObj.q);
    location.hash = "#SearchRes";
  }
});

async function Search(q) {
  let parm = "page=0&pageSize=20";

  if (q) {
    parm += `&name=${q}`;
  } else {
    if (formInput[0].value != "") parm += `&name=${formInput[0].value}`;
    if (formSelect[0].value != "Choose")
      parm += `&classification=${formSelect[0].value}`;
    if (formSelect[1].value != "Choose") parm += `&type=${formSelect[1].value}`;
    if (formInput[1].value != "") parm += `&health=${formInput[1].value}`;
    if (formInput[2].value != "") parm += `&armor=${formInput[2].value}`;
    if (formInput[3].value != "") parm += `&strength=${formInput[3].value}`;
  }

  await print(parm);
  return;
}

async function Get(parms) {
  let Q = await fetch(`${API}/v1/entities?${parms}`);
  let data = await Q.json();
  console.log(data);
  return data;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  Search();
});

async function print(parm) {
  errDiv.style.display = "none";
  DivResult.remove();
  DivResult = document.createElement("div");
  DivResult.className = "result";
  main.appendChild(DivResult);
  let JSON = await Get(parm);
  if (JSON.length == 0) {
    errDiv.style.display = "flex";
  } else {
    for (let i of JSON) {
      console.log(i);
      await add(i.classification, i.image, i.name, i.type, i.id);
    }
  }
}

async function add(classification, image, name, type, id) {
  const divHostile = document.createElement("div");
  divHostile.className = type.toLowerCase();

  const h2Wrapper = document.createElement("div");
  const h2 = document.createElement("h2");
  h2.textContent = name;
  h2Wrapper.appendChild(h2);
  divHostile.appendChild(h2Wrapper);

  const img = document.createElement("img");
  img.src = image;
  img.alt = name;
  divHostile.appendChild(img);

  const outerDiv = document.createElement("div");

  const innerDiv = document.createElement("div");

  const p1 = document.createElement("p");
  p1.textContent = classification;
  innerDiv.appendChild(p1);

  const p2 = document.createElement("p");
  p2.textContent = type;
  innerDiv.appendChild(p2);

  outerDiv.appendChild(innerDiv);

  const hr = document.createElement("hr");
  outerDiv.appendChild(hr);

  const link = document.createElement("a");
  link.href = `asset/renseignements.html?q=${id}`;
  link.rel = "noopener noreferrer";
  link.textContent = "SEE MORE";
  outerDiv.appendChild(link);

  divHostile.appendChild(outerDiv);

  DivResult.appendChild(divHostile);
}
