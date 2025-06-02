const express = require("express");
const verifyJWT = require("../middlewares/verifyJWT");
const bookController = require("../controllers/book/bookController");

const router = express.Router();

router.use(verifyJWT);

router.get("/", bookController.getBooks);
router.post("/", bookController.addReview);

module.exports = router;
