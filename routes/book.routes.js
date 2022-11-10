const express = require("express");
const router = express.Router();
const bookController = require("../controller/bookController");
const authJWT = require("../middlewares/auth")

router.post("/",authJWT, bookController.createBook);
router.get("/",authJWT,  bookController.getBook);
router.patch("/:id",authJWT,  bookController.updateBook);
router.delete("/:id", authJWT, bookController.deleteBook);

router.all('/*', function (req, res) {
    res.status(404).send("Requested resource for Book not found");
  })
module.exports = router;
