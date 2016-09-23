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

	window.$l = function (selector) {
	  if (selector instanceof HTMLElement) {
	    const selectorArr = [selector];
	    return new DOMNodeCollection(selectorArr);
	  } else {
	    const elements = Array.from(document.querySelectorAll(selector));
	    return new DOMNodeCollection(elements);
	  }
	};


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

	}

	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);