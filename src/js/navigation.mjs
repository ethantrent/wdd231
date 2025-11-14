// Navigation module - handles all navigation interactions

function toggleMenu(element) {
  element.classList.toggle("show");
}

function toggleSubmenu(event) {
  // Get the button that was clicked
  let button = event.target;
  
  // Make sure we have the button element (not something inside it)
  if (button.tagName !== "BUTTON") {
    button = button.closest("button");
  }
  
  // Find the parent li and then the submenu ul inside it
  const parentLi = button.closest("li");
  const submenu = parentLi.querySelector(".global-nav__submenu");
  
  if (submenu) {
    // Toggle the show class on the submenu
    submenu.classList.toggle("show");
    
    // Toggle the open class on the button for arrow rotation
    button.classList.toggle("open");
  }
}

function setupSubmenuToggles() {
  // Get all submenu toggle buttons
  const submenuButtons = document.querySelectorAll(".global-nav__split-button__toggle");
  
  // Add click event listener to each button
  submenuButtons.forEach((button) => {
    button.addEventListener("click", toggleSubmenu);
  });
}

function setupMainMenuToggle() {
  // Get the main menu button
  const menuButton = document.querySelector("#global-nav-toggle");
  const globalNav = document.querySelector(".global-nav");
  
  if (menuButton && globalNav) {
    menuButton.addEventListener("click", (event) => {
      let target = event.target;
      
      // Check to see if target is the button or something inside the button
      if (target.tagName !== "BUTTON") {
        target = target.closest("button");
      }
      
      // Toggle the show class on the global-nav
      toggleMenu(globalNav);
      
      // Check to see if we just opened or closed the menu
      if (globalNav.classList.contains("show")) {
        // If we opened it then set the aria-expanded attribute on the button to true
        target.setAttribute("aria-expanded", "true");
        target.setAttribute("aria-label", "Close Menu");
      } else {
        // If we closed it then set the aria-expanded attribute on the button to false
        target.setAttribute("aria-expanded", "false");
        target.setAttribute("aria-label", "Open Menu");
      }
    });
  }
}

export default function enableNavigation() {
  setupMainMenuToggle();
  setupSubmenuToggles();
}
