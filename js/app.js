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
