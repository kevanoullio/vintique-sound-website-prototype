/*---- Hamburger Menu Logic ----*/
window.addEventListener("DOMContentLoaded", (event) => {
    const menuHamburgerIcon = document.querySelector("#menu-hamburger-icon");
    const menuItems = document.querySelector("#menu-items");

    menuHamburgerIcon.addEventListener("click", function(event) {
        event.stopPropagation();
        menuItems.classList.toggle("open");
    });

    document.addEventListener("click", function() {
        menuItems.classList.remove("open");
    });
});


/*---- Accordion Logic ----*/
var accordionButton = document.getElementsByClassName("accordion-button");
var i;

for (i = 0; i < accordionButton.length; i++) {
    accordionButton[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
}
