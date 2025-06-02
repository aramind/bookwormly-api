const addReview = require("./addReview");
const getBooks = require("./getBooks");
const deleteBook = require("./deleteBook");

const bookController = {
  addReview,
  getBooks,
  deleteBook,
};

module.exports = bookController;
