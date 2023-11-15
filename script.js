const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
}

addBookToLibrary("Interesting", "Author", "123", true);
addBookToLibrary("Interestaasding", "Author", "123", false);
console.log(myLibrary);

function unpackSVG(objectElement) {
  objectElement.parentNode.replaceChild(
    objectElement.contentDocument.documentElement,
    objectElement
  );
}
