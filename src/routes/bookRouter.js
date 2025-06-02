const express = require("express");
const authController = require("../controllers/auth/authController");
const verifyJWT = require("../middlewares/verifyJWT");

const router = express.Router();

router.use(verifyJWT);

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
module.exports = router;
