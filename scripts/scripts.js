let myLibrary = [];

function Book(name, autor, pages, status) {
    this.name = name;
    this.autor = autor;
    this.pages = pages;
    this.status = status;
}

Book.prototype.showBook = function () {
    return `<h2 class="bookData"> ${this.name} </h2>
            <br>
            <p>By ${this.autor} <br>
            Pages, ${this.pages}</p><br><br><br>
            <footer>${this.status}</footer>`;
}

function addBookToLibrary(name, autor, pages, status) {
    var newBook = new Book(name, autor, pages, status);
    myLibrary.push(newBook);
}

function deleteBook(bookName) {
    myLibrary.forEach( book => {
        if(book.name == bookName) {
            myLibrary.splice(myLibrary.indexOf(book), 1);
        }
    });
    document.getElementById(bookName).remove();
}

var render = function (book, node) {
    var div = document.createElement("div");
    div.className = "book";
    div.id = book.name;
    div.innerHTML = ` <br><input type="button" value="X" 
                      onclick="deleteBook('${div.id}')"> 
                      ${book.showBook()}`;
    node.appendChild(div);
};

function bookList() {
    myLibrary.forEach(book => 
        render(book, document.querySelector(".container"))
    );
}

// form info 
function formInfo() {
    // colect info
    var inLibrary = false;
    var bookName = document.querySelector("#bName").value;
    var autorName = document.querySelector("#aName").value;
    var pagesNumber = document.querySelector("#pNumber").value;
    var bookStatus = document.querySelector("#rBook").checked;

    //validate info
    if (bookStatus) {    
        bookStatus = "Read";
    } else {
        bookStatus = "no Read";
    }
    myLibrary.forEach(book => {
        if (bookName==book.name) inLibrary=true;
    });
    if (!inLibrary) {
        if (bookName&&autorName&&pagesNumber) {
            clean();
            addBookToLibrary(bookName, autorName, pagesNumber, bookStatus);
            bookList();   
        }
    }
    
    // reset form
    document.querySelector(".form").reset();  
}

function clean() {
    var elements = document.querySelectorAll(".book");
    elements.forEach(node => node.remove())
}

const addBtn = document.querySelector("#add");
addBtn.addEventListener("click", formInfo);
addBookToLibrary("kender", "Kender", 500, "Read");
bookList();


