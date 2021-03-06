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

// const startingTime = performance.now();

const navbarList = document.querySelector("#navbar__list");
const main = document.querySelector("main");
const topButton = document.querySelector("#back-to-top");
const header = document.querySelector("header.page__header");
const allSections = document.querySelectorAll("section");
const activeClass = "active-section";

// isScrolling is using to hide the navigation bar after
// 3 seconds with no scrolling
let isScrolling;

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

// return true if the element is in view port
const inView = (el) => {
  const bouncing = el.getBoundingClientRect();

  return bouncing.top >= 0 && bouncing.bottom <= window.innerHeight;
};

// Remove active class from every section
const removeActiveClass = () => {
  activeSection = document.querySelector(`.${activeClass}`);
  activeSection.classList.remove(activeClass);
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
    // Create the HTML content for the item
    const item = createNavItem(section);

    fragment.appendChild(item);
  }

  navbarList.appendChild(fragment);
};

// Add class 'active-section' to section when near top of viewport
const activateSection = (section) => {
  for (const section of allSections) {
    if (inView(section)) {
      // Remove active class from other sections
      // This function must be called before adding another active class
      // to another section
      removeActiveClass();

      section.classList.add(activeClass);
    }
  }
};

// Scroll to anchor ID using scrollTO event
const scrollToSection = (e) => {
  // The clicked target must be an anchor tag
  if (e.target.nodeName != "A") return;

  e.preventDefault();
  const sectionID = e.target.getAttribute("href");
  const section = document.querySelector(sectionID);
  section.scrollIntoView({ behavior: "smooth" });
};

// Hide fixed navigation bar after 3 seconds with no scrolling
const hideNavBar = () => {
  header.style.opacity = "1";
  clearTimeout(isScrolling);

  // Make navbar visible on the top of the page
  if (window.scrollY <= window.innerHeight) return;

  isScrolling = setTimeout(() => {
    header.style.opacity = "0";
  }, 3000);
};

const hideBackToTopBtn = () => {
  // Hide the button on the top of the page
  if (window.scrollY <= window.innerHeight) {
    topButton.style.opacity = "0";
  } else {
    topButton.style.opacity = "1";
  }
};

// Scroll back to the top of the page
const backToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// toggle sections
const collapseSection = (event) => {
  // Toggle the section when click on the title only
  if (event.target.nodeName != "H2") return;

  const parent = event.target.parentElement;
  const content = parent.querySelector(".content");
  content.classList.toggle("hide");
};
/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
document.addEventListener("DOMContentLoaded", buildNav);

// Scroll to section on link click
navbarList.addEventListener("click", scrollToSection);

// Set sections as active
document.addEventListener("scroll", activateSection);

// Hide fixed navigation bar while not scrolling
document.addEventListener("scroll", hideNavBar);

// scroll to top of the page
topButton.addEventListener("click", backToTop);

// scroll to top button on the page that’s only visible
// when the user scrolls below the fold of the page.
document.addEventListener("scroll", hideBackToTopBtn);

// Make sections collapsible.
main.addEventListener("click", collapseSection);

// const endingTime = performance.now();
// console.log(`Page loaded within ${endingTime - startingTime}`);
