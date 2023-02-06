import Swiper, { Autoplay, Navigation, Pagination } from 'swiper';
import toggleBodyLock from './helpers/toggleBodyLock';
import { MousePRLX } from './libs/parallaxMouse';
import { gsapAnimations } from './modules';

/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
  navToggle = document.getElementById('nav-toggle'),
  navClose = document.getElementById('nav-close');

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu');
  });
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
  });
}

/*===== CLOSE MENU ON ESCAPE =====*/
const escapeHandler = (e) => {
  if (e.key === 'Escape') {
    navMenu.classList.remove('show-menu');
  }
};
document.addEventListener('keydown', escapeHandler);

/*===== CLOSE MENU ON EXTERNAL CLICK =====*/
document.addEventListener('click', function (event) {
  if (event.target.closest('.nav')) return;

  navMenu.classList.remove('show-menu');
});

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
  const navMenu = document.getElementById('nav-menu');
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove('show-menu');
}
navLink.forEach((n) => n.addEventListener('click', linkAction));

const sections = document.querySelectorAll('section[id]');

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector('.nav__menu a[href*=' + sectionId + ']')
        .classList.add('active-link');
    } else {
      document
        .querySelector('.nav__menu a[href*=' + sectionId + ']')
        .classList.remove('active-link');
    }
  });
}
window.addEventListener('scroll', scrollActive);

/*=============== CLOSE/OPEN MODAL ===============*/
const formsModalPopup = document.querySelector('.formsModal');
function setToggleWindowPopup() {
  document.addEventListener('click', ({ target }) => {
    const formsModalButton = document.getElementById('home-button');

    if (target && target === formsModalButton) {
      formsModalPopup.classList.add('_active');
      toggleBodyLock(true);
    }

    if (target && target.classList.contains('_overlay')) {
      formsModalPopup.classList.remove('_active');
      toggleBodyLock(false);
    }
  });
}
setToggleWindowPopup();

const formsModalClose = document.getElementById('formsModal-close');
if (formsModalClose) {
  formsModalClose.addEventListener('click', () => {
    formsModalPopup.classList.remove('_active');
    toggleBodyLock(false);
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    formsModalPopup.classList.remove('_active');
    toggleBodyLock(false);
  }
});

/*=============== SEND AJAX ===============*/
let form = document.querySelector('form');
function submitHandler(e) {
  e.preventDefault();

  fetch('https://google.com', {
    method: 'POST',
    body: new FormData(form),
    mode: 'no-cors',
  })
    .then((response) => response.json())
    .then(function (data) {
      alert('Your form is send');
      console.log(data);
    })
    .catch(function (error) {
      alert('Sorry Error ocurred');
      console.log(error);
    });
}
form.addEventListener('submit', submitHandler);

/*=============== MOUSE PARALLAX ===============*/
new MousePRLX({});

/*=============== SWIPER ===============*/
const defaultSliderConfig = {
  modules: [Autoplay, Navigation, Pagination],
  direction: 'horizontal',
  autoplay: { delay: 3000 },
  speed: 800,
  slidesPerView: '1',
};

new Swiper('.mySwiper', {
  ...defaultSliderConfig,
  loop: true,
  lazy: { enabled: true },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    dynamicBullets: true,
  },
});

/*=============== FIXED HEADER ON SCROLL ===============*/
function scrollHeader() {
  const header = document.getElementById('header');
  // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 50) header.classList.add('scroll-header');
  else header.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

/*=============== GSAP ANIMATIONS ===============*/
gsapAnimations();
