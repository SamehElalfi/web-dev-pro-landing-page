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
const navbar = document.getElementById("navbar__list");
const sectionActiveClass = "your-active-class";
const topButton = document.getElementById("move-to-top");
const header = document.querySelector("header.page__header");
const mainTag = document.querySelector("main");

// Setup isScrolling variable
// used to hide navbar after 3 seconds
let isScrolling;

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

// Return all sections of the landing page
const getAllSections = () => {
  return document.querySelectorAll("main section");
};

const buildListItem = (sectionName, sectionID) => {
  const listItem = document.createElement("li");
  const span = document.createElement("span");
  listItem.appendChild(span);

  span.classList.add("menu__link");
  span.setAttribute("data-section", sectionID);
  span.textContent = sectionName;

  return listItem;
};

const removeActiveClassFromAllSections = () => {
  const sections = document.querySelectorAll(`.${sectionActiveClass}`);
  for (const section of sections) {
    section.classList.remove(sectionActiveClass);
  }
};

const isElementVisible = (el) => {
  const bouncing = el.getBoundingClientRect();

  // check if element is completely visible
  if (bouncing.bottom <= window.innerHeight * 1.5 && bouncing.top >= 0) {
    return true;
  }
  return false;
};
/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
const buildNav = (sections) => {
  const navFragment = document.createDocumentFragment();
  const navbar = document.getElementById("navbar__list");

  for (const section of sections) {
    const sectionName = section.getAttribute("data-nav");
    const sectionID = section.getAttribute("id");

    const listItem = buildListItem(sectionName, sectionID);
    navFragment.appendChild(listItem);
  }

  navbar.appendChild(navFragment);
};

// Add class 'active' to section when near top of viewport
const addActiveClass = (el) => {
  removeActiveClassFromAllSections();
  el.classList.add(sectionActiveClass);
};

// Scroll to anchor ID using scrollTO event
const scrollToSection = (event) => {
  const sectionID = event.target.getAttribute("data-section");
  if (event.target.nodeName == "SPAN") {
    const section = document.getElementById(sectionID);

    const sectionTopPosition =
      section.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: sectionTopPosition, behavior: "smooth" });
  }
  // scrollIntoView might be used but it does not has good support in some browsers
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
  // section.scrollIntoView({ behavior: "smooth" });
};

const setSectionAsActive = () => {
  const sections = getAllSections();
  for (const section of sections) {
    // check if section is completely visible
    sectionVisible = isElementVisible(section);

    if (sectionVisible) {
      addActiveClass(section);
      break;
    }
  }
};

const hideNavOnStopScrolling = () => {
  window.clearTimeout(isScrolling);
  header.style.opacity = "1";

  // Set a timeout to run after scrolling ends
  isScrolling = setTimeout(function () {
    if (window.pageYOffset > 0) header.style.opacity = "0";
  }, 3000);
};

const hideTopButtonAtTop = () => {
  if (window.pageYOffset < 100) {
    // hide the button
    topButton.style.opacity = "0";
  } else {
    topButton.style.opacity = "1";
  }
};

const toggleSection = (event) => {
  if (event.target.nodeName != "H2") return;
  const parent = event.target.parentElement;
  const paragraphs = parent.querySelectorAll("p");
  for (const p of paragraphs) {
    p.classList.toggle("hide");
  }
};

/**
 * End Main Functions
 * Begin Events
 *
 */

// Scroll to section on link click
navbar.addEventListener("click", scrollToSection);

// Move to the top when click on the button
topButton.addEventListener("click", (event) => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Set sections as active
document.addEventListener("scroll", setSectionAsActive);

// Hide the navbar if the user stop scrolling for 3 seconds
document.addEventListener("scroll", hideNavOnStopScrolling);

// Hide move-to-top button at the top of the page
document.addEventListener("scroll", hideTopButtonAtTop);

// Make sections collapsible.
mainTag.addEventListener("click", toggleSection);

/**
 * End Events
 * Begin Main Script
 *
 */

const main = () => {
  const sections = getAllSections();
  buildNav(sections);
};
main();
