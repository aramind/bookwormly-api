const User = require("../../models/User");
const genAToken = require("../../utils/genAToken");
const genRToken = require("../../utils/genRToken");
const sendResponse = require("../../utils/sendResponse");
const _ = require("lodash");

const signin = async (req, res) => {
  const clientType = req.headers["x-client-type"]?.toLowerCase() || "web";
  const isFromMobile = clientType === "mobile";

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || user?.password !== password) {
      return sendResponse.failed(res, "Invalid credentials!", null, 404);
    }

    const accessToken = genAToken(user);
    const refreshToken = genRToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    const returnedUserInfo = _.pick(user, [
      "_id",
      "username",
      "email",
      "profileImage",
    ]);

    if (!isFromMobile) {
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
    }

    const resPayload = {
      userInfo: returnedUserInfo,
      token: accessToken,
      refreshToken: isFromMobile ? refreshToken : null,
    };

    return sendResponse.success(res, "Login successful", resPayload, 200);
  } catch (error) {
    console.error(error);
    return sendResponse.failed(res, "Server Error", error, 500);
  }
};

module.exports = signin;
