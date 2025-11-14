import "../css/style.css"; // we can do this type of import because we are using Vite
import "../css/conditions.css";
import { getParkData, getAlertData, getVisitorCenterData } from "./parkService.mjs";
import setHeaderFooter from "./setHeaderFooter.mjs";
import { alertTemplate, visitorCenterTemplate, activityTemplate } from "./templates.mjs";

function setAlerts(alerts) {
  const alertListEl = document.querySelector(".alert-list");
  const html = alerts.map(alertTemplate);
  alertListEl.innerHTML = html.join("");
}

function setVisitorCenters(centers) {
  const centerListEl = document.querySelector(".visitor-center-list");
  const html = centers.map(visitorCenterTemplate);
  centerListEl.innerHTML = html.join("");
}

function setActivities(activities) {
  const activityListEl = document.querySelector(".activity-list");
  const html = activities.map(activityTemplate);
  activityListEl.innerHTML = html.join("");
}

function enableNavigation() {
  // use a querySelector to get the menu button
  const menuButton = document.querySelector("#global-nav-toggle");
  const globalNav = document.querySelector(".global-nav");
    
  // when the main menu button is clicked:
  menuButton.addEventListener("click", (ev) => {
    let target = ev.target;
    
    // check to see if target is the button or something inside the button
    if (target.tagName !== "BUTTON") {
      target = target.closest("button");
    }
    
    // toggle the show class on the global-nav
    globalNav.classList.toggle("show");
    
    // check to see if we just opened or closed the menu
    if (globalNav.classList.contains("show")) {
      // if we opened it then set the aria-expanded attribute on the button to true
      target.setAttribute("aria-expanded", "true");
      target.setAttribute("aria-label", "Close Menu");
    } else {
      // if we closed it then set the aria-expanded attribute on the button to false
      target.setAttribute("aria-expanded", "false");
      target.setAttribute("aria-label", "Open Menu");
    }
  });
}

async function init() {
  const parkData = await getParkData();
  setHeaderFooter(parkData);
  
  const alerts = await getAlertData(parkData.parkCode);
  setAlerts(alerts);
  
  const visitorCenters = await getVisitorCenterData(parkData.parkCode);
  setVisitorCenters(visitorCenters);
  
  setActivities(parkData.activities);
  enableNavigation();
}

init();
