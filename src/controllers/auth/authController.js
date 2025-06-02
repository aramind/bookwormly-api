const signup = require("./signup");
const signin = require("./signin");

const authController = {
  signup,
  signin,
};

module.exports = authController;
