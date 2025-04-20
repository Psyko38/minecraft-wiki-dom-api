let tabdiv = document.querySelector(".tab");
let mapdiv = document.querySelector(".Map");
const maintab = document.querySelector(".maintab");
const MainMap = document.querySelector(".MainMap");
const EntitySelect = document.querySelector("#Entity");
const sing = document.querySelector("main > div:nth-child(1) > p");
const form = document.querySelector("form");
const formInput = form.querySelectorAll("input");
const formSelect = form.querySelectorAll("select");

const API = "http://51.38.232.174:3000";
let TabData = 666;

Setup();

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  let x1 = Math.floor(Math.random() * 37);
  let z1 = Math.floor(Math.random() * 17);
  if (formInput[0].value) x1 = Math.abs(formInput[0].value);
  if (formInput[1].value) z1 = Math.abs(formInput[1].value);
  if (x1 >= 0 && x1 <= 37 && z1 >= 0 && z1 <= 16) {
    await Post(formSelect[0].value, x1, z1);
    Refresh();
  } else {
    alert(
      "La coordonnée X doit être comprise entre 0 et 37, et la coordonnée Y entre 0 et 16."
    );
  }
});

async function Setup() {
  Refresh();
  setInterval(Refresh, 5000);
  let data = await Fetche("entities");
  for (let i of data) {
    const newe = new Option(i.name, i.id);
    EntitySelect.add(newe);
  }
}

async function Post(id, x, z) {
  const Q = await fetch(`${API}/v1/arena/entities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      entityId: id,
      x: x, // -12 et 25
      z: z, // -16 et 0
    }),
  });
  const rep = await Q.json();
  console.log(rep);
  return rep;
}

async function Fetche(URL) {
  const q = await fetch(`${API}/v1/${URL}`);
  const data = await q.json();
  return data;
}

async function Removea(id) {
  const q = await fetch(`${API}/v1/arena/entities/${id}`, { method: "DELETE" });
  await Refresh();
  return q;
}

async function Refresh() {
  let JSON = await Fetche("arena/entities");
  let statuss = await Fetche("arena");
  sing.textContent = statuss.status.toUpperCase();
  if (sing.textContent == "OPEN") {
    sing.style.background = "#4f8c69";
    setFormEnabled(1);
  } else {
    sing.style.background = "#F25959";
    setFormEnabled(0);
  }
  if (JSON.length == 0 && TabData == 0) return;
  TabData = JSON.length;
  await AddTab(JSON);
  await AddMap(JSON);
}

async function AddMap(JSON) {
  mapdiv.remove();
  mapdiv = document.createElement("div");
  mapdiv.className = "Map";
  MainMap.appendChild(mapdiv);

  for (let i = 0; i < JSON.length; i++) {
    AddToMap(
      JSON[i].entity.icon,
      JSON[i].x,
      JSON[i].z,
      JSON[i].arena.height,
      JSON[i].arena.width,
      0
    );
  }
  if (JSON.length == 0) {
    AddToMap("../img/Boss.svg", "", "", "", "", 1);
  } else {
    AddToMap(
      "../img/Boss.svg",
      Math.floor(JSON[0].arena.width / 2),
      Math.floor(JSON[0].arena.height / 2),
      JSON[0].arena.height,
      JSON[0].arena.width,
      1
    );
  }
}

function AddToMap(imgUrl, x, y, maxY, maxX, type) {
  const container = document.createElement("div");
  container.style.zIndex = y;

  container.style.left = `${(x / maxX) * 100}%`;
  container.style.top = `${(y / maxY) * 100}%`;

  const image = document.createElement("img");
  image.src = imgUrl;
  image.alt = `Point (${x}, ${y})`;

  const coordText = document.createElement("p");
  coordText.textContent = `${x}, ${y}`;
  if (type) {
    coordText.style.background = "#FFFFFF";
    coordText.style.border = "1px solid #F25959";
  }

  if (maxX == "" && type) {
    container.style.left = "50%";
    container.style.top = "50%";
    coordText.textContent = `50%, 50%`;
  }

  container.appendChild(image);
  container.appendChild(coordText);

  mapdiv.appendChild(container);
}

async function AddTab(JSON) {
  tabdiv.remove();
  tabdiv = document.createElement("div");
  tabdiv.className = "tab";
  maintab.appendChild(tabdiv);
  const header = document.createElement("div");
  const headerLabels = [
    "Entity",
    "Name",
    "X Coordinate",
    "Y Coordinate",
    "Strength",
    "del",
  ];
  headerLabels.forEach((text) => {
    const p = document.createElement("p");
    p.textContent = text;
    header.appendChild(p);
  });
  tabdiv.appendChild(header);
  let tabs = 1;
  for (let i of JSON) {
    createEntityRow(
      `tab${tabs}`,
      i.entity.icon,
      i.entity.name,
      i.x,
      i.z,
      i.entity.armor,
      i.id
    );
    if (tabs == 1) {
      tabs = 2;
    } else {
      tabs = 1;
    }
  }
  maintab.appendChild(tabdiv);
}

function createEntityRow(className, immage, name, x, y, strength, id) {
  const div = document.createElement("div");
  div.className = className;

  const img = document.createElement("img");
  img.src = immage;
  img.alt = "Img";
  div.appendChild(img);

  const pName = document.createElement("p");
  pName.textContent = name;
  div.appendChild(pName);

  const pX = document.createElement("p");
  pX.textContent = x;
  div.appendChild(pX);

  const pY = document.createElement("p");
  pY.textContent = y;
  div.appendChild(pY);

  const pStrength = document.createElement("p");
  pStrength.textContent = strength;
  div.appendChild(pStrength);

  const button = document.createElement("button");
  button.textContent = "DELETE";
  div.appendChild(button);
  tabdiv.appendChild(div);

  button.addEventListener("click", () => {
    Removea(id);
  });
}

function setFormEnabled(OnOff) {
  const enabled = !!OnOff;
  for (let input of formInput) {
    input.disabled = !enabled;
  }
  for (let select of formSelect) {
    select.disabled = !enabled;
  }
  form.className = enabled ? "On1" : "Off1";
}
