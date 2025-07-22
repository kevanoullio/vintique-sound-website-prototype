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


/*---- DROPDOWN LOGIC ----*/
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
  const select = dropdown.querySelector('.dropdown-select');
  const arrow = dropdown.querySelector('.dropdown-arrow');
  const menu = dropdown.querySelector('.dropdown-menu');
  const options = dropdown.querySelectorAll('.dropdown-menu li');
  const selected = dropdown.querySelector('.dropdown-selected');

  select.addEventListener('click', () => {
    select.classList.toggle('dropdown-select-clicked');
    arrow.classList.toggle('dropdown-arrow-rotate');
    menu.classList.toggle('dropdown-menu-open');
  });

  options.forEach(option => {
    option.addEventListener('click', () => {
      selected.textContent = option.textContent;
      select.classList.remove('dropdown-select-clicked');
      arrow.classList.remove('dropdown-arrow-rotated');
      menu.classList.remove('dropdown-menu-open');
      options.forEach(opt => {
        opt.classList.remove('active');
      });
      option.classList.add('active');
    });
  });
});



/*---- GOOGLE SHEETS DATA FETCHING ----*/
// Function to fetch data from Google Sheets and update stats
async function updateStatsFromGoogleSheets() {
  // Google Sheets ID from the iframe URL
  const SHEET_ID = '1I3DHmsZE5agCO3yzW6rW_SD9NH--h31vOounKd0-sWs';

  // Requires sheet be public, use the CSV export URL
  // Format: https://docs.google.com/spreadsheets/d/[SHEET_ID]/export?format=csv&gid=0
  const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=0`;

  try {
    // Fetch the CSV data
    const response = await fetch(CSV_URL);
    const csvText = await response.text();

    // Parse CSV (simple parsing for demonstration)
    const rows = csvText.split('\n').map(row => row.split(','));

    // Assuming your data is in the second row (index 1)
    // You may need to adjust these indices based on your actual sheet structure
    const dataRow = rows[1]; // Second row (first row is usually headers)

    // Update the stat numbers with calculated/derived values
    // These are example calculations - adjust based on your actual data
    const projectsMixed = dataRow[1] ? parseInt(dataRow[1].replace(/"/g, '')) || 0 : 0;
    const mastersComplete = dataRow[2] ? parseInt(dataRow[2].replace(/"/g, '')) || 0 : 0;
    const happyArtists = dataRow[3] ? parseInt(dataRow[3].replace(/"/g, '')) || 0 : 0;

    // Animate the numbers counting up
    animateNumber(document.querySelector('[data-sheet-cell="B2"]'), projectsMixed);
    animateNumber(document.querySelector('[data-sheet-cell="C2"]'), mastersComplete);
    animateNumber(document.querySelector('[data-sheet-cell="D2"]'), happyArtists);

  } catch (error) {
    console.error('Error fetching Google Sheets data:', error);
    // Fallback to default values if fetch fails
    setDefaultStats();
  }
}

// Function to animate number counting
function animateNumber(element, targetNumber) {
  if (!element) return;

  const duration = 2000; // 2 seconds
  const startTime = performance.now();
  const startNumber = 0;

  function updateNumber(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function for smooth animation
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const currentNumber = Math.floor(startNumber + (targetNumber - startNumber) * easeOutQuart);

    element.textContent = currentNumber.toLocaleString(); // Add commas for large numbers

    if (progress < 1) {
      requestAnimationFrame(updateNumber);
    }
  }

  requestAnimationFrame(updateNumber);
}

// Function to set default stats if Google Sheets fetch fails
function setDefaultStats() {
  // Set some example default values
  const defaults = {
    '[data-sheet-cell="B2"]': 183,
    '[data-sheet-cell="C2"]': 167,
    '[data-sheet-cell="D2"]': 42
  };

  Object.entries(defaults).forEach(([selector, value]) => {
    const element = document.querySelector(selector);
    if (element) {
      animateNumber(element, value);
    }
  });
}

// Initialize stats when page loads
document.addEventListener('DOMContentLoaded', function() {
  // Only update stats if we're on a page that has the stats section
  if (document.querySelector('.stats-section')) {
    updateStatsFromGoogleSheets();
  }
});
