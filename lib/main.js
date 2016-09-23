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

window.$l.extend = function () {
  const objArr = Array.from(arguments);
  const newObj = {};

  objArr.forEach ( (object) => {
    for (let key in object) {
      newObj[key] = object[key];
    }
  });

  return newObj;
};

window.$l.ajax = function (options) {
  const defaults = {
    method: 'GET',
    url: window.location.pathname,
    dataType: 'JSON',
    data: {},
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    success: function () {},
    error: alert('ERROR RECEIVED')
  };

  const merged_object = window.$l.extend(defaults, options);

  const xhr = new XMLHttpRequest();
  xhr.open(merged_object.method, merged_object.url);
  xhr.onload = function () {
    if (xhr.status === 200) {
      merged_object.success();
    } else {
      merged_object.error();
    }
  };
  xhr.send(merged_object.data);
};
