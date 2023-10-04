const bg = document.querySelector("html");

bg.addEventListener("mousemove", (e) => {
    bg.style.backgroundPositionX = -e.offsetX + "px";
    bg.style.backgroundPositionY = -e.offsetY + "px";
});