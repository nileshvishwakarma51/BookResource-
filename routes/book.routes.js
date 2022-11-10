const express = require("express");
const router = express.Router();
const bookController = require("../controller/bookController");
// const authJWT = require("../middlewares/authJwt")

router.post("/", bookController.createBook);
router.get("/",  bookController.getBook);
router.patch("/:id",  bookController.updateBook);
router.delete("/:id",  bookController.deleteBook);

router.all('/*', function (req, res) {
    res.status(404).send("Requested resource for Book not found");
  })
module.exports = router;
