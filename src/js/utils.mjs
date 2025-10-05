// Retrieve a URL parameter by name
export function getParams(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

// Wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// Or a more concise version if you prefer:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// Retrieve data from localStorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// Save data to localStorage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// Render a list with a template function
export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

// Load header and footer partials
export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("/partials/header.html");
  const footerTemplate = await loadTemplate("/partials/footer.html");

  const headerElement = document.querySelector("header");
  const footerElement = document.querySelector("footer");

  if (headerElement && headerTemplate) {
    renderWithTemplate(headerTemplate, headerElement);
  }

  if (footerElement && footerTemplate) {
    renderWithTemplate(footerTemplate, footerElement);
  }
}

// Load a template from a file
async function loadTemplate(path) {
  try {
    const response = await fetch(path);
    if (response.ok) {
      return await response.text();
    }
  } catch (error) {
    return null;
  }
  return null;
}

// Render a template into an element
function renderWithTemplate(template, parentElement) {
  if (parentElement) {
    parentElement.innerHTML = template;
  }
}
