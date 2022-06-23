const {
  addBook,
  showBook,
  showbooksbyId,
  changebooksbyId,
  bookDelete,
} = require("./handler");

const routes = [
  {
    method: "POST",
    path: "/books",
    handler: addBook,
  },
  {
    method: "GET",
    path: "/books",
    handler: showBook,
  },
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: showbooksbyId,
  },
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: changebooksbyId,
  },
  {
    method: "DELETE",
    path: "/books/{bookId}",
    handler: bookDelete,
  },
];

module.exports = routes;
