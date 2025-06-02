const Book = require("../../models/Book");
const sendResponse = require("../../utils/sendResponse");
import cloudinary from "../../lib/cloudinary";

const deleteBook = async (req, res) => {
  try {
    const user = req?.credentials?._id;

    const book = await Book.findById(req.params?.id);
    if (!book) {
      return sendResponse.failed(res, "Book not found.", null, 404);
    }
    // check if user is the creator
    if (book.user.toString() !== user?.toString()) {
      return sendResponse.failed(res, "Unauthorized", null, 403);
    } else {
      //   delete the image from cloudinary also
      if (book.image && book.image.includes("cloudinary")) {
        try {
          const publicId = book.image.split("/").pop().split(".")[0];
          await cloudinary.uploader.destroy(publicId);
        } catch (error) {
          console.error("Error deleting image from cloudinary", error);
        }
      }
      await book.deleteOne;

      sendResponse.success(res, "Book deleted successfully", null, 201);
    }
  } catch (error) {}
};

module.exports = deleteBook;
