// Commect styles
import '../scss/main.scss';

import * as bodyScrollLock from 'body-scroll-lock';

// Sidebar menu
const refsMenu = {
  openMenuBtn: document.querySelector('.js-menu-open'),
  closeMenuBtn: document.querySelector('.js-menu-close'),
  overlayMenu: document.querySelector('.js-menu'),
};

const toggleMenu = () => {
  const isMenuOpen =
    refsMenu.openMenuBtn.getAttribute('aria-expanded') === 'true' || false;
  refsMenu.openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
  refsMenu.overlayMenu.classList.toggle('is-open');

  const scrollLockMethod = !isMenuOpen
    ? 'disableBodyScroll'
    : 'enableBodyScroll';
  bodyScrollLock[scrollLockMethod](document.body);
};

refsMenu.openMenuBtn.addEventListener('click', toggleMenu);
refsMenu.closeMenuBtn.addEventListener('click', toggleMenu);

// Close the mobile menu on wider screens if the device orientation changes
window.matchMedia('(min-width: 1200px)').addEventListener('change', event => {
  if (!event.matches) return;

  refsMenu.overlayMenu.classList.remove('is-open');
  refsMenu.openMenuBtn.setAttribute('aria-expanded', false);
  bodyScrollLock.enableBodyScroll(document.body);
});

const menuItems = document.querySelectorAll('.menu-item a');

// Отримуємо поточний URL сторінки
const currentURL = window.location.pathname;  

// Функція для очищення шляху
const normalizeURL = url =>
  url
    .replace(/^\.?\//, '/') // ./ або / → /
    .replace(/\/$/, '');


const normalizedCurrentURL = normalizeURL(currentURL);

// Перебираємо всі пункти меню та перевіряємо, чи співпадає їх URL з поточним
menuItems.forEach(item => {
  const itemURL = item.getAttribute('href'); // ./index.html

  // Пропускаємо елементи з порожнім href
  if (!itemURL) {
    item.addEventListener('click', e => e.preventDefault());
    return;
  }

  const normalizedItemURL = normalizeURL(itemURL);

  // Перевіряємо, чи співпадає URL або чи містить поточний URL частину href
  if (
    normalizedCurrentURL === normalizedItemURL
  ) {
    item.classList.add('current'); // Додаємо клас 'current' до активного пункту меню
  } else {
    item.classList.remove('current'); // Видаляємо клас 'current' з інших пунктів
  }
});

// Додаємо обробник події для кожного елемента меню
menuItems.forEach(item => {
  item.addEventListener('click', function () {
    menuItems.forEach(link => link.classList.remove('current')); // Видаляємо клас 'current' з усіх елементів
    item.classList.add('current'); // Додаємо клас 'current' до поточного елементу
  });
});
