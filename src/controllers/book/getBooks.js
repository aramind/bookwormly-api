const Book = require("../../models/Book");
const sendResponse = require("../../utils/sendResponse");

const getBooks = async (req, res) => {
  try {
    const page = req.query?.page || 1;
    const limit = req.query?.limit || 5;
    const skip = (page - 1) * limit;
    const books = await Book.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "username profileImage");

    if (!books) {
      return sendResponse.failed(res, "Book(s) not found!", null, 404);
    }

    const responsePayload = {
      books,
      currentPage: page,
      totalBooks: await Book.countDocuments(),
      totalPages: Math.ceil(totalBooks / limit),
    };
    return sendResponse.success(
      res,
      "Book(s) successfully retrieved",
      responsePayload,
      200
    );
  } catch (error) {
    console.error(error);
    return sendResponse.failed(res, "Server Error.", error, 500);
  }
};

module.exports = getBooks;
