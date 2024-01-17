const express = require("express");
const app = express();
const router = require("./router");

const bodyparser = require("body-parser");
const cors = require("cors");

require("dotenv").config();
const PORT = process.env.PORT || 3001;

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

// middleware
app.use(cors(corsOptions));
app.use(bodyparser.json());

app.use(router);

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> Server now listening on PORT ${PORT}!`);
});
