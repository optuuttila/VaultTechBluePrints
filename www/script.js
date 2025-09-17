const menuToggle = document.getElementById('menu-toggle'); 
const menuOverlay = document.getElementById('menu-overlay'); 
const menuNav = document.querySelector('.menu-nav');  

const logo = document.querySelector('.logo'); // OSSI TUUTTILA linkki
const contactSquare = document.getElementById('contact-square');

const header = document.querySelector('.header');
const footer = document.querySelector('.footer');

const hero = document.querySelector('.hero');

const aboutLink = document.querySelector('#menu-overlay a[href="#about"]');
const projectsLink = document.querySelector('#menu-overlay a[href="#projects"]');
const resumeLink = document.querySelector('#menu-overlay a[href="#resume"]');
const logoLink = document.querySelector('.logo'); // OSSI TUUTTILA linkki

const aboutSection = document.querySelector('.about-me');
const projectsSection = document.querySelector('.highlighted-projects');
const heroSection = document.querySelector('.hero');

const projectsPage = document.querySelector('.projects-page');
const resumePage = document.querySelector('.resume-page');


let contactViewActive = false;

// Menu toggle 
menuToggle.addEventListener('click', () => { 
  menuOverlay.classList.toggle('active'); 
  menuToggle.textContent = menuOverlay.classList.contains('active') ? 'CLOSE' : 'MENU'; 

  if (menuOverlay.classList.contains('active')) {
    positionMenuUnderToggle();
  }
}); 

function hideAllPages() {
  // Etusivun osiot piiloon
  hero.style.display = 'none';
  projectsSection.style.display = 'none';   // tämä piilottaa highlighted projects
  footer.style.display = 'none';

  // Muut erilliset sivut piiloon
  aboutSection.style.display = 'none';
  projectsPage.style.display = 'none';
  resumePage.style.display = 'none';
}

function setHeroMargin() {
  if (header && heroSection) {
    const headerHeight = header.offsetHeight;

    // Perustila
    let margin = headerHeight;

    // Lisää extra-tilaa isolla näytöllä
    if (window.innerWidth >= 1200) {
      margin += 50; // esim. 50px enemmän
    }

    heroSection.style.marginTop = `${margin}px`;
  }
}

window.addEventListener('load', setHeroMargin);
window.addEventListener('resize', setHeroMargin);

logoLink.addEventListener('click', (e) => {
  e.preventDefault(); // estetään normaali selaimen ankkurihyppy

  // Suljetaan overlay, jos se on auki
  menuOverlay.classList.remove('active');
  menuToggle.textContent = 'MENU';

  // Palautetaan hero näkyviin ja piilotetaan footer
  hero.style.display = 'flex';
  footer.style.display = 'none';
  document.body.style.background = '#ffffff';
  contactViewActive = false;

  // Scrollataan hero-sectioniin
  hero.scrollIntoView({ behavior: 'smooth' });
});

// Asettaa .menu-nav:n position ja transform siten että sen keskikohta
// on MENU-painikkeen keskellä ja yläreuna on hieman MENU:n alapuolella.
function positionMenuUnderToggle() {
  if (!menuNav || !menuToggle) return;

  const rect = menuToggle.getBoundingClientRect();

  // Käytetään vasenta reunaa, ei keskikohtaa
  const leftPos = rect.left;
  const topBelow = rect.bottom + 8; // 8px väli MENU:n ja listan välissä

  menuNav.style.left = `${leftPos}px`;
  menuNav.style.top = `${topBelow}px`;
  menuNav.style.transform = 'none'; // ei keskitystä
  menuNav.style.position = 'absolute';
}

// Päivitä sijainti resize-/scroll-tapahtumissa jos overlay auki
window.addEventListener('resize', () => {
  if (menuOverlay.classList.contains('active')) positionMenuUnderToggle();
  syncHeroTextHeight();
});
window.addEventListener('scroll', () => {
  if (menuOverlay.classList.contains('active')) positionMenuUnderToggle();
});

// Tekstin korkeus samaksi kuin kuvan korkeus 
function syncHeroTextHeight() { 
  const heroImage = document.querySelector('.hero-image img'); 
  const heroText = document.querySelector('.hero-text'); 

  if (heroImage && heroText) { 
    const imgHeight = heroImage.clientHeight; 
    heroText.style.height = `${imgHeight}px`; 
  } 
} 

window.addEventListener('load', syncHeroTextHeight); 
window.addEventListener('resize', syncHeroTextHeight);

function showAboutSection() {
  hero.style.display = 'none';
  projectsSection.style.display = 'none';
  footer.style.display = 'none';
  aboutSection.style.display = 'grid'; // koska about-me on grid
  document.body.style.background = '#ffffff';
  contactViewActive = true;

  // Suljetaan overlay ja palautetaan MENU-teksti
  menuOverlay.classList.remove('active');
  menuToggle.textContent = 'MENU';
}

// Neliö
contactSquare.addEventListener('click', () => {
  contactViewActive = !contactViewActive;

  if (contactViewActive) {
    showAboutSection();
  } else {
    hero.style.display = 'flex';
    projectsSection.style.display = 'grid'; // palautetaan projektilista
    footer.style.display = 'block';
    aboutSection.style.display = 'none';
    document.body.style.background = '#ffffff';
  }
});

function showHomepage() {
  hero.style.display = 'flex';
  projectsSection.style.display = 'block';
  footer.style.display = 'block';
  aboutSection.style.display = 'none';
  document.body.style.background = '#ffffff';

  // Jos overlay on auki, suljetaan se ja palautetaan MENU
  menuOverlay.classList.remove('active');
  menuToggle.textContent = 'MENU';
}

// Projects
projectsLink.addEventListener('click', (e) => {
  e.preventDefault();
  hideAllPages();
  projectsPage.style.display = 'block';
  menuOverlay.classList.remove('active');
  menuToggle.textContent = 'MENU';
});

// Resume
resumeLink.addEventListener('click', (e) => {
  e.preventDefault();
  hideAllPages();
  resumePage.style.display = 'block';
  menuOverlay.classList.remove('active');
  menuToggle.textContent = 'MENU';
});

// OSSI TUUTTILA klikkaus
logo.addEventListener('click', (e) => {
  e.preventDefault();
  showHomepage();
});

// MENU → About
if (aboutLink) {
  aboutLink.addEventListener('click', (e) => {
  e.preventDefault();
  hideAllPages();
  aboutSection.style.display = 'grid'; // näytetään vain About
  menuOverlay.classList.remove('active');
  menuToggle.textContent = 'MENU';
});
}
