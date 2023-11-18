const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
  createCard(title, author, pages, read, myLibrary[myLibrary.length - 1]);
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

function createCard(title, author, page, read, bookObj) {
  const cardContainer = document.createElement("div");
  const exitButton = document.createElement("button");
  const titleHeader = document.createElement("h2");
  const authorText = document.createElement("p");
  const pageText = document.createElement("p");
  const readContainer = document.createElement("div");

  readContainer.style.display = "flex";
  readContainer.style.gap = "10px";
  const readLabel = document.createElement("label");
  const readCheckbox = document.createElement("input");
  readLabel.innerHTML = "Read:";
  readCheckbox.type = "checkbox";
  readContainer.append(readLabel, readCheckbox);
  if (read) {
    readCheckbox.checked = "checked";
  }

  bookCardContainer.appendChild(cardContainer);
  cardContainer.appendChild(exitButton);
  exitButton.appendChild(document.createElement("object"));
  exitButton.firstChild.type = "image/svg+xml";
  exitButton.firstChild.data = "./images/cross.svg";
  exitButton.firstChild.addEventListener("load", () => {
    exitButton.replaceChild(
      exitButton.firstChild.contentDocument.documentElement,
      exitButton.firstChild
    );
  });
  exitButton.addEventListener("click", () => {
    myLibrary.splice(myLibrary.indexOf(bookObj), 1);
    console.log(myLibrary);
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
    pageText,
    readContainer
  );
}

const errorText = createError();
document.querySelector("#book-form").addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e);
  if (myLibrary.length === 0) {
    addBookToLibrary(
      e.target["title"].value,
      e.target["author"].value,
      e.target["pages"].value,
      e.target["read"].checked
    );
    console.log(myLibrary);
    dialog.close();
  } else {
    for (book of myLibrary) {
      if (e.target["title"].value === book["title"]) {
        if (errorText.parentElement !== e.target.children[1]) {
          e.target["title"].style.borderBottom = "1px solid red";
          e.target.children[1].appendChild(errorText);
        }
        return;
      }
    }
    if (errorText.parentElement === e.target.children[1]) {
      e.target.children[1].removeChild(errorText);
      e.target["title"].style.borderBottom = "1px solid lightgray";
    }
    addBookToLibrary(
      e.target["title"].value,
      e.target["author"].value,
      e.target["pages"].value,
      e.target["read"].checked
    );
    console.log(myLibrary);
    dialog.close();
  }
});

function createError() {
  const error = document.createElement("p");
  error.style.color = "red";
  error.innerHTML = "Book title already exists!";
  error.style.fontFamily = "var(--system-ui)";
  error.style.position = "absolute";
  error.style.fontSize = "10pt";
  error.style.marginTop = "5px";
  error.style.gridColumn = "1 / 3";
  return error;
}
