/*---- HAMBURGER MENU LOGIC ----*/
window.addEventListener("DOMContentLoaded", (event) => {
  const menuHamburgerIcon = document.querySelector("#menu-hamburger-icon");
  const menuItems = document.querySelector("#menu-items");

  menuHamburgerIcon.addEventListener("click", function (event) {
    event.stopPropagation();
    menuItems.classList.toggle("open");
  });

  document.addEventListener("click", function () {
    menuItems.classList.remove("open");
  });
});

/*---- THEME TOGGLE LOGIC ----*/
// Theme toggle logic
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Load theme from localStorage if available
if (localStorage.getItem('theme')) {
  html.setAttribute('data-theme', localStorage.getItem('theme'));
}

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  // Optionally, update button icon/text
  themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
});

/*---- ACCORDION LOGIC ----*/
var accordionButton = document.getElementsByClassName("accordion-button");
var i;

for (i = 0; i < accordionButton.length; i++) {
  accordionButton[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}
