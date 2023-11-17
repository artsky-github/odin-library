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

function unpackSVG(objectElement) {
  objectElement.parentNode.replaceChild(
    objectElement.contentDocument.documentElement,
    objectElement
  );
}

const dialog = document.querySelector("#dialog-box");

document.querySelector("#open-modal").addEventListener("click", () => {
  dialog.showModal();
});

document.querySelector("#close-modal").addEventListener("click", () => {
  dialog.close();
});
