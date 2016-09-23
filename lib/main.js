const DOMNodeCollection = require('./dom_node_collection.js');
const funkyQueue = [];

window.$l = function (selector) {
  if (typeof selector === "function") {
    funkyQueue.push(selector);
  }
  if (selector instanceof HTMLElement) {
    const selectorArr = [selector];
    return new DOMNodeCollection(selectorArr);
  } else {
    const elements = Array.from(document.querySelectorAll(selector));
    return new DOMNodeCollection(elements);
  }

  document.addEventListener("DOMContentLoaded", () => {
    funkyQueue.forEach ( (func) => {
      func();
    });
  });
};
