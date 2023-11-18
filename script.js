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

const bookCardContainer = document.querySelector("#book-card-container");

function createCard(title, author, page) {
  const cardContainer = document.createElement("div");
  const exitButton = document.createElement("button");
  const titleHeader = document.createElement("h2");
  const authorText = document.createElement("p");
  const pageText = document.createElement("p");

  bookCardContainer.appendChild(cardContainer);
  cardContainer.appendChild(exitButton);
  exitButton.appendChild(document.createElement("object"));
  exitButton.firstChild.type = "image/svg+xml";
  exitButton.firstChild.data = "/images/cross.svg";
  exitButton.firstChild.addEventListener("load", () => {
    exitButton.replaceChild(
      exitButton.firstChild.contentDocument.documentElement,
      exitButton.firstChild
    );
  });
  exitButton.addEventListener("click", () => {
    cardContainer.remove();
  });
  titleHeader.innerHTML = `${title}`;
  authorText.innerHTML = `Author: ${author}`;
  pageText.innerHTML = `Pages: ${page}`;
  cardContainer.append(
    exitButton,
    exitButton,
    titleHeader,
    authorText,
    pageText
  );
}

document.querySelector("#book-form").addEventListener("submit", (e) => {
  e.preventDefault();
  if (myLibrary.length === 0) {
    addBookToLibrary(
      e.target["title"].value,
      e.target["author"].value,
      e.target["pages"].value,
      e.target["read"].value
    );
    createCard(
      e.target["title"].value,
      e.target["author"].value,
      e.target["pages"].value
    );
    dialog.close();
  } else {
    for (book of myLibrary) {
      if (e.target["title"].value === book["title"]) {
        return;
      }
    }
    addBookToLibrary(
      e.target["title"].value,
      e.target["author"].value,
      e.target["pages"].value,
      e.target["read"].value
    );
    createCard(
      e.target["title"].value,
      e.target["author"].value,
      e.target["pages"].value
    );
    dialog.close();
  }
});
