const NavBTN = document.querySelector(".burger");
const MediaBTN = document.querySelector(".MediaBTN");
const MediaUi = document.querySelector(".media");

NavBTN.addEventListener("click", () => {
  MediaUi.style.display = "unset";
});

MediaBTN.addEventListener("click", () => {
  MediaUi.style.display = "none";
});
