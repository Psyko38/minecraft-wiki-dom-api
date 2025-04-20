const Searche = document.querySelector("#Search");
const NavBTN = document.querySelector(".burger");
const MediaBTN = document.querySelector(".MediaBTN");
const MediaUi = document.querySelector(".media");

NavBTN.addEventListener("click", () => {
  MediaUi.style.display = "unset";
});

MediaBTN.addEventListener("click", () => {
  MediaUi.style.display = "none";
});

Searche.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    window.location.href = `${window.location.origin}/index.html?q=${Searche.value}`;
  }
});
