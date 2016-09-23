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

}

module.exports = DOMNodeCollection;
