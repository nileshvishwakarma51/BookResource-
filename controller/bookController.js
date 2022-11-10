const bookModelMethod = require("../model/BookModel");
const multer = require("multer");
const fs = require("fs");

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, res, cb) {
      cb(null, "bookImg");
    },
    filename: function (req, file, cb) {
      let fileName = Date.now() + file.originalname;
      cb(null, fileName);
    },
  }),
  fileFilter: function (req, file, cb) {
    let fileTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (fileTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb({ message: "Only allowed file types: jpeg, jpg and png" });
    }
  },
}).single("bookImg");

const deleteFile = (req) => {
  fs.unlink(req.file.path, function (err) {
    if (err) {
      console.log(err);
    }
  });
};

let createBook = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      res.send(err.message);
    } else {
      try {
        const { bookName, bookAuthor, bookPages, bookPrice } = req.body;

        if (!req.file) {
          return res.send("Book Image is required");
        }
        if (!bookName) {
          deleteFile(req);
          return res.send("Book Name is required");
        }
        if (!bookAuthor) {
          deleteFile(req);
          return res.send("Book Author is required");
        }
        if (!bookPages) {
          deleteFile(req);
          return res.send("Book Pages is required");
        }
        if (!bookPrice) {
          deleteFile(req);
          return res.send("Book Price is required");
        }
        req.body.bookImgURL = req.file.filename;
        let createdBook = await bookModelMethod.createBook(req.body);
        return res.status(200).send(createdBook);
      } catch (err) {
        deleteFile(req);
        return res.status(400).send(err);
      }
    }
  });
};

let getBook = async (req, res) => {
  let conditionObj = {};
  if (req.query.bookName) {
    conditionObj.bookName = { $regex: req.query.bookName, $options: "i" };
  }
  try {
    let getBook = await bookModelMethod.getBook(conditionObj);    
    if (!getBook.length) {
      return res.status(404).send(`Book not found: ${req.query.bookName}`);
    }
    return res
      .status(200)
      .send(getBook);
  } catch (err) {
    return res.status(400).send(err);
  }
};

let updateBook = async (req, res) => {
  try {
    let bookId = req.params.id;
    let updatedBook = await bookModelMethod.updateBook(bookId, req.body);
    return res
    .status(200)
    .send(`Book updated Sucessfully ${updatedBook}`);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

let deleteBook = async (req, res) => {
  try {
    let bookId = req.params.id;
    let deletedBook = await bookModelMethod.deleteBook(bookId);
    return res
    .status(200)
    .send(`Book deleted Sucessfully ${deletedBook}`);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

module.exports = { createBook, getBook, updateBook, deleteBook };
