/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const DOMNodeCollection = __webpack_require__(1);
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
	    error: function () {alert('ERROR RECEIVED'); }
	  };

	  const merged_object = window.$l.extend(defaults, options);

	  const xhr = new XMLHttpRequest();
	  xhr.open(merged_object.method, merged_object.url);
	  xhr.onload = function () {
	    if (xhr.status === 200) {
	      console.log('IM IN THE SUCCESSSSS');
	      merged_object.success(xhr.response);
	    } else {
	      console.log('IM IN THE ERROR');
	      merged_object.error();
	    }
	  };
	  xhr.send(merged_object);
	};

	const buddy = window.$l('ul');
	window.$l.ajax(
	  {
	    url: '/',
	    // success: function () { console.log('I DID IT BBBAAABBBBABABBAYYYY'); }
	    success: function (data) { console.log(data); }
	  }
	);


/***/ },
/* 1 */
/***/ function(module, exports) {

	Array.prototype.diff = function(a) {
	    return this.filter(function(i) {return a.indexOf(i) < 0;});
	};

	class DOMNodeCollection {

	  constructor (HTMLElements) {
	    this.elements = HTMLElements;
	  }

	  html(string) {
	    if (typeof string === "string") {
	      this.forEach( (element) => {
	        element.innerHTML = string;
	      });
	    } else {
	      return this.elements[0].innerHTML;
	    }
	  }

	  empty() {
	    this.html('');
	  }

	  append(collection) {
	    if (typeof collection === "string" || collection instanceof HTMLElement) {
	      appendOne(collection);
	    } else {
	      this.elements.forEach ( (element) => {
	        collection.forEach ( (arg) => {
	          element.innerHTML += ' ' +  arg;
	        });
	      });
	    }
	  }

	  appendOne(arg) {
	    this.elements.forEach( (element) => {
	      if (typeof arg === "string") {
	        element.innerHTML += ' ' +  arg;
	      } else {
	        element.innerHTML += arg.outerHTML;
	      }
	    });
	  }

	  attr(attr_name, value) {
	    if (value !== undefined) {
	      this.elements.forEach( (element) => {
	        element.setAttribute(attr_name, value);
	      });
	    } else {
	      return this.elements[0].getAttribute(attr_name);
	    }
	  }

	  addClass(class_args) {
	    const add_classes = class_args.split(" ");
	    this.elements.forEach( (element) => {
	      element.classList.add(...add_classes);
	    });


	    this.elements.forEach( (element) => {
	      element.className = class_args;
	    });
	  }

	  removeClass(class_args) {
	    const remove_classes = class_args.split(" ");
	    this.elements.forEach( (element) => {
	      element.classList.remove(...remove_classes);
	    });
	  }

	  children () {
	    let children = [];

	    this.elements.forEach ( (element) => {
	      children = children.concat(Array.from(element.children));
	    });

	    return new DOMNodeCollection(children);
	  }

	  parent () {
	    let parents = [];

	    this.elements.forEach ( (element) => {
	      parents = parents.concat(element.parentNode);
	    });

	    return new DOMNodeCollection(parents);
	  }

	  find (selector) {
	    let found_elements = [];

	    this.elements.forEach ( (element) => {
	      found_elements = found_elements.concat(Array.from(element.querySelectorAll(selector)));

	    });
	    return new DOMNodeCollection(found_elements);
	  }

	  remove() {
	    this.empty();
	    this.elements = [];
	  }

	  on (handleCase, callback) {
	    this.elements.forEach( (element) => {
	      element.addEventListener(handleCase, callback);
	    });
	  }

	  off (handleCase, callback) {
	    this.elements.forEach( (element) => {
	      element.removeEventListener(handleCase, callback);
	    });
	  }

	}

	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);