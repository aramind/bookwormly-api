const User = require("../../models/User");
const sendResponse = require("../../utils/sendResponse");

const signup = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (username || !email || !password) {
      return sendResponse.failed(res, "All fields are required", null, 400);
    }

    if (password?.length < 6) {
      return sendResponse.failed(
        res,
        "Password should be at least 6 characters long",
        null,
        400
      );
    }

    if (username?.length < 3) {
      return sendResponse.failed(
        res,
        "Username should be at least 3 characters long",
        null,
        400
      );
    }

    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing) {
      sendResponse.failed(res, "User already exists!", null, 400);
    }

    // TODO: hash the password

    // generate token

    // get random avatar
    const profileImage = `https://api.dicebear.com/9.x/avataaars/svg?seed=${username}`;
    const user = new User({
      email,
      username,
      password,
      profileImage,
    });

    const createdUser = await user.save;

    sendResponse.success(
      res,
      "Signup successful.",
      { ...createdUser, password: "" },
      201
    );
  } catch (error) {
    console.error(error);
    sendResponse.failed(res, "Server Error", error, 500);
  }
};

module.exports = signup;
