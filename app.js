const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { PORT, dbUrl } = require("./config/config");
const bookRouter = require("./routes/book.routes");
mongoose.connect(dbUrl);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/book", bookRouter);

app.all('/*', function (req, res) {
  res.status(404).send("Requested resource not found");
})

app.listen(PORT, (err, res) => {
  if (err) {
    console.log("Unable to start the server");
  } else {
    console.log(`Server is up and running at port ${PORT}`);
  }
});
