const Book = require("../../models/Book");
const sendResponse = require("../../utils/sendResponse");

const getBooks = async (req, res) => {
  try {
    const user = req?.credentials?._id;

    const books = await Book.find({ user });
    if (!books) {
      return sendResponse.failed(res, "Book(s) not found!", null, 404);
    }

    return sendResponse.success(
      res,
      "Book(s) successfully retrieved",
      books,
      200
    );
  } catch (error) {
    console.error(error);
    return sendResponse.failed(res, "Server Error.", error, 500);
  }
};

module.exports = getBooks;
