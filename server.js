const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = process.env.PORT || 8000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("develop/public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budget", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// routes
app.use(require("./develop/routes/api.js"));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/develop/public/index.html')
})

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});