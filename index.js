async function Get(parms) {
	let Q = await fetch(`http://192.168.1.15:3000/v1/entities?${parms}`);
	let data = await Q.json();
	return data;
}

const form = document.querySelector("form");
const formInput = form.querySelectorAll("input");
const formSelect = form.querySelectorAll("select");

form.addEventListener("submit", (event) => {
	event.preventDefault();
	let parm = "page=0";

	if (formInput[0].value != "") parm += `&string=${formInput[0].value}`;
	if (formSelect[0].value != "Choose")
		parm += `&classification=${formSelect[0].value}`;
	if (formSelect[1].value != "Choose") parm += `&type=${formSelect[1].value}`;
	if (formInput[1].value != "") parm += `&health=${formInput[1].value}`;
	if (formInput[2].value != "") parm += `&armor=${formInput[2].value}`;
	if (formInput[3].value != "") parm += `&strength=${formInput[3].value}`;
	console.log(Get(parm));
	console.log(parm);
});
