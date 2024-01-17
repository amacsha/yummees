const mongoose = require("mongoose");
require("dotenv").config();

const DBPATH = process.env.DBPATH;

mongoose.connect(DBPATH);

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected 😇");
});

module.exports = mongoose;