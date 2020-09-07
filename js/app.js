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

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

function getAllSections() {
  return document.querySelectorAll("main section");
}

function buildListItem(sectionName, sectionID) {
  const listItem = document.createElement("li");
  const span = document.createElement("span");
  listItem.appendChild(span);

  span.classList.add("menu__link");
  span.setAttribute("data-section", sectionID);
  span.textContent = sectionName;

  return listItem;
}

function removeActiveClassFromAllSections() {
  const sections = document.querySelectorAll(`.${sectionActiveClass}`);
  for (const section of sections) {
    section.classList.remove(sectionActiveClass);
  }
}

function isElementVisible(el) {
  const bouncing = el.getBoundingClientRect();

  // check if element is completely visible
  if (bouncing.bottom <= window.innerHeight * 1.5 && bouncing.top >= 0) {
    return true;
  }
  return false;
}
/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
function buildNav(sections) {
  const navFragment = document.createDocumentFragment();
  const navbar = document.getElementById("navbar__list");

  for (const section of sections) {
    const sectionName = section.getAttribute("data-nav");
    const sectionID = section.getAttribute("id");

    const listItem = buildListItem(sectionName, sectionID);
    navFragment.appendChild(listItem);
  }

  navbar.appendChild(navFragment);
}

// Add class 'active' to section when near top of viewport
function addActiveClass(el) {
  removeActiveClassFromAllSections();
  el.classList.add(sectionActiveClass);
}

// Scroll to anchor ID using scrollTO event
function scrollToSection(sectionID) {
  const section = document.getElementById(sectionID);

  const sectionTopPosition =
    section.getBoundingClientRect().top + window.pageYOffset;
  window.scrollTo({ top: sectionTopPosition, behavior: "smooth" });

  // scrollIntoView might be used but it does not has good support in some browsers
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
  // section.scrollIntoView({ behavior: "smooth" });
}

/**
 * End Main Functions
 * Begin Events
 *
 */

// Scroll to section on link click
navbar.addEventListener("click", (event) => {
  const sectionID = event.target.getAttribute("data-section");
  if (event.target.nodeName == "SPAN") {
    scrollToSection(sectionID);
  }
});

// Set sections as active
document.addEventListener("scroll", (event) => {
  const sections = getAllSections();
  for (const section of sections) {
    // check if section is completely visible
    sectionVisible = isElementVisible(section);

    if (sectionVisible) {
      addActiveClass(section);
      break;
    }
  }
});

// Hide move-to-top button at the top of the page
document.addEventListener("scroll", (event) => {
  if (window.pageYOffset < 100) {
    topButton.classList.remove("show__move-top-button");
  } else {
    topButton.classList.add("show__move-top-button");
  }
});

// Move to the top when click on the button
topButton.addEventListener("click", (event) => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

function main() {
  const sections = getAllSections();
  buildNav(sections);
}
main();
