const sidebarButton = document.querySelector("#hiddenSidebar");
const show = document.querySelector("#showSidebar");
const aside = document.querySelector("aside");


sidebarButton.addEventListener("click", event => {

    const span = document.querySelector("header span");

    aside.style.display = "none";

    show.style.flexGrow = "2";
    show.style.textAlign = "left";
    show.style.paddingLeft = "10px";
    show.style.display = "block";

    span.style.flexGrow = "2";

});
show.addEventListener("click", event => {
    const span = document.querySelector("header span");

    aside.style.display = "flex";
    show.style.display = "none";

    span.style.flexGrow = "";
});