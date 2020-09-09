/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */

const navbarList = document.querySelector("#navbar__list");
const topButton = document.querySelector("#move-to-top");
const header = document.querySelector("header.page__header");
const allSections = document.querySelectorAll("section");
const activeClass = "active-section";

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

// Return new item in the navbar for any given section
const createNavItem = (section) => {
  const sectionID = section.getAttribute("id");
  const sectionName = section.getAttribute("data-nav");
  const item = document.createElement("li");
  item.innerHTML = `<a href="#${sectionID}" class="menu__link">${sectionName}</a>`;

  return item;
};

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
const buildNav = () => {
  const fragment = document.createDocumentFragment();
  for (const section of allSections) {
    const item = createNavItem(section);
    fragment.appendChild(item);
  }

  navbarList.appendChild(fragment);
};

// Add class 'active' to section when near top of viewport

// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
document.addEventListener("DOMContentLoaded", buildNav);

// Scroll to section on link click

// Set sections as active
