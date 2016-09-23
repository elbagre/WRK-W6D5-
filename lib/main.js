const DOMNodeCollection = require('./dom_node_collection.js');

window.$l = function (selector) {
  if (selector instanceof HTMLElement) {
    const selectorArr = [selector];
    return new DOMNodeCollection(selectorArr);
  } else {
    const elements = Array.from(document.querySelectorAll(selector));
    return new DOMNodeCollection(elements);
  }
};
