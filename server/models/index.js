const mongoose = require("mongoose");

const DBPATH = process.env.DBPATH || "mongodb://127.0.0.1:27017/test";

mongoose.connect(DBPATH);

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected 😇");
});

module.exports = mongoose;
