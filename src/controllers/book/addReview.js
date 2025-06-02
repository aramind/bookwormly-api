const sendResponse = require("../../utils/sendResponse");
const cloudinary = require("../../lib/cloudinary");
const addReview = async (req, res) => {
  try {
    const { title, caption, rating, image } = req.body;
    const user = req?.credentials;

    console.log("USER", user);
    if (!title || !caption || !rating || !image) {
      return sendResponse.failed(res, "Please provide all fields", null, 400);
    }

    // upload image to cloudinary
    const uploadRes = await cloudinary.uploader.upload(image);
    const imageUrl = uploadRes.secure_url;

    // save to db
    const newBook = newBook({
      title,
      caption,
      rating,
      image: imageUrl,
      user: user._id,
    }).save();

    return sendResponse.success(res, "New book added.", newBook, 201);
  } catch (error) {
    console.error(error);
    sendResponse.failed(res, "Server Error", error, 500);
  }
};

module.exports = addReview;
