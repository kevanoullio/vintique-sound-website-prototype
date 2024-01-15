/* Hamburger Menu Logic */
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
