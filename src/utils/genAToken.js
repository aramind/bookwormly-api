require("dotenv").config();
const _ = require("lodash");
const jwt = require("jsonwebtoken");

const genAToken = (user) => {
  const userInfo = _.pick(user, ["_id"], "username", "email", "profileImage");

  const token = jwt.sign(
    { UserInfo: userInfo },
    process.env.AUTH_ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.AUTH_ACCESS_TOKEN_EXPIRY }
  );

  return token;
};

module.exports = genAToken;
