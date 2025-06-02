const jwt = require("jsonwebtoken");
const sendResponse = require("../utils/sendResponse");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers?.authorization || req.headers?.authorization;

  if (!authHeader?.startsWith("Bearer")) {
    return sendResponse.failed(res, "Unknown Authorization", null, 401);
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.AUTH_ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      if (err.message === "jwt expired") {
      }
      return sendResponse.failed(res, "Unauthorize access", err, 403);
    }

    req.credentials = decoded.UserInfo;
    console.log(req.credentials);
    next();
  });
};

module.exports = verifyJWT;
