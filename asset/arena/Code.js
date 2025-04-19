let tabdiv = document.querySelector(".tab");
const maintab = document.querySelector(".maintab");
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
  let x1 = Math.floor(Math.random() * (25 - -12 + 1)) + -12;
  let z1 = Math.floor(Math.random() * (0 - -16 + 1)) + -16;
  if (formInput[0].value) x1 = formInput[0].value - 12;
  if (formInput[1].value) z1 = `-${Math.abs(formInput[1].value)}`;
  if (x1 >= -12 && x1 <= 25 && z1 >= -16 && z1 <= 0) {
    await Post(formSelect[0].value, x1, z1);
    PrintTab();
  } else {
    alert(
      "La coordonnée X doit être comprise entre 0 et 37, et la coordonnée Y entre 0 et 16."
    );
  }
});

async function Setup() {
  PrintTab();
  setInterval(PrintTab, 5000);
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
  return rep;
}

async function Fetche(URL) {
  const q = await fetch(`${API}/v1/${URL}`);
  const data = await q.json();
  return data;
}

async function Removea(id) {
  const q = await fetch(`${API}/v1/arena/entities/${id}`, { method: "DELETE" });
  await PrintTab();
  return q;
}

async function PrintTab() {
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
