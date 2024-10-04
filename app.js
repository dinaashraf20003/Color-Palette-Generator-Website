const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');
const navLogo = document.querySelector('#navbar__logo');

// Display Mobile Menu
const mobileMenu = () => {
  menu.classList.toggle('is-active');
  menuLinks.classList.toggle('active');
};

menu.addEventListener('click', mobileMenu);

// Show active menu when scrolling
const highlightMenu = () => {
  const elem = document.querySelector('.highlight');
  const homeMenu = document.querySelector('#home-page');
  const aboutMenu = document.querySelector('#about-page');
  const historyMenu = document.querySelector('#history-page');
  let scrollPos = window.scrollY;

  // adds 'highlight' class to my menu items
  if (window.innerWidth > 960 && scrollPos < 600) {
    homeMenu.classList.add('highlight');
    aboutMenu.classList.remove('highlight');
    return;
  } else if (window.innerWidth > 960 && scrollPos < 1400) {
    aboutMenu.classList.add('highlight');
    homeMenu.classList.remove('highlight');
    historyMenu.classList.remove('highlight');
    return;
  } else if (window.innerWidth > 960 && scrollPos < 2345) {
    historyMenu.classList.add('highlight');
    aboutMenu.classList.remove('highlight');
    return;
  }

  if ((elem && window.innerWidth < 960 && scrollPos < 600) || elem) {
    elem.classList.remove('highlight');
  }
};

window.addEventListener('scroll', highlightMenu);
window.addEventListener('click', highlightMenu);

// Close mobile Menu when clicking on a menu item
const hideMobileMenu = () => {
  const menuBars = document.querySelector('.is-active');
  if (window.innerWidth <= 768 && menuBars) {
    menu.classList.toggle('is-active');
    menuLinks.classList.remove('active');
  }
};

// Close mobile menu on menu item click
menuLinks.addEventListener('click', hideMobileMenu);
navLogo.addEventListener('click', hideMobileMenu);

// Function to generate a random color
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const colorBlocks = document.querySelectorAll('.color-block');
const generateBtn = document.getElementById('generate-btn');

// Select all history blocks across cards
const colorHistoryBlocks = document.querySelectorAll('.color-block-history');
let colorHistory = [];

// Function to generate color palette and update history
function generatePalette() {
  colorBlocks.forEach(block => {
    const randomColor = getRandomColor();
    block.style.backgroundColor = randomColor;
    block.setAttribute('data-color', randomColor);
    block.innerText = randomColor;
    
    // Add the generated color to history
    colorHistory.push(randomColor);
    
    // Limit history to the number of available history blocks
    if (colorHistory.length > colorHistoryBlocks.length) {
      colorHistory.shift(); // Remove the oldest color
    }
    
    // Update history blocks with colors from history
    colorHistoryBlocks.forEach((historyBlock, index) => {
      if (colorHistory[index]) {
        historyBlock.style.backgroundColor = colorHistory[index];
        historyBlock.setAttribute('data-color', colorHistory[index]);
      }
    });
  });
}

generateBtn.addEventListener('click', generatePalette);

// Copy color codes to clipboard on block click
colorBlocks.forEach(block => {
  block.addEventListener('click', () => {
    const colorCode = block.getAttribute('data-color');
    navigator.clipboard.writeText(colorCode).then(() => {
      alert(`Copied ${colorCode} to clipboard!`);
    });
  });
});

// Function to copy specific history palette to clipboard
function copyHistoryToClipboard(historyBlocks) {
  const colors = Array.from(historyBlocks).map(block => block.getAttribute('data-color')).join(', ');
  navigator.clipboard.writeText(colors).then(() => {
    alert(`Copied palette to clipboard: ${colors}`);
  });
}

// Adding the "Copy" buttons with specific functionality
const startButtons = document.querySelectorAll('.history__btn button');
startButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    const correspondingHistoryBlocks = document.querySelectorAll(`.history__card:nth-child(${index + 1}) .color-block-history`);
    copyHistoryToClipboard(correspondingHistoryBlocks);
  });
});

