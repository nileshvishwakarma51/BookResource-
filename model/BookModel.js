const mongoose = require("mongoose");
const bookSchema = mongoose.Schema({
  bookName: {
    type: String,
    required: { value: true, message: "Book Name is required" },
    trim: true
  },
  bookAuthor: {
    type: String,
    required: { value: true, message: "Book Author is required" },
    trim: true,
  },
  bookPages: {
    type: Number,
    required: { value: true, message: "Book Pages is required" },
  },
  bookPrice:{
    type: Number,
    required: { value: true, message: "Book Price is required" },
  },
  bookImgURL:{
    type: String,
    required: { value: true, message: "Book Image is required" },
    trim: true
  }
});

const book = mongoose.model("bookDetails", bookSchema);

const createBook = async (bookObj) => {
  try {
    const createdBook = await book.create(bookObj);
    return createdBook;
  } catch (err) {
      if (err.name == "ValidationError") {
        for (field in err.errors) {
          throw { message: err.errors[field].message };
        }
    }
    throw { message: err.message };
  }
};

let getBook = async (bookObj) => {
  try {
    const getBook= await book.find(bookObj);
    return getBook;
  } catch (err) {
    throw new Error(err.message);
  }
};

let updateBook = async (_id, bookObj) => {
  try {
    const updatedBook = await book.findByIdAndUpdate(_id, bookObj,{new: true})
    return updatedBook;
  } catch (err) {
    throw new Error(err.message);
  }
};

let deleteBook = async (_id) => {
  try {
    const deletedBook = await book.findByIdAndDelete(_id)
    return deletedBook;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = { createBook, getBook, updateBook, deleteBook };
