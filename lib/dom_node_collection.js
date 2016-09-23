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
