require("dotenv").config();
const _ = require("lodash");
const jwt = require("jsonwebtoken");

const genRToken = (user) => {
  const userInfo = _.pick(user, ["_id", "username", "email"]);

  const token = jwt.sign(
    { UserInfo: userInfo },
    process.env.AUTH_REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.AUTH_REFRESH_TOKEN_EXPIRY }
  );

  return token;
};

module.exports = genRToken;
