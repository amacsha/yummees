const mongoose = require("./index");

const Schema = mongoose.Schema;

const placesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  mood: {
    type: String,
  },
  review: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  likes: {
    type: Number,
    default: 0,
  },
});

const Places = mongoose.model("Places", placesSchema);

module.exports = Places;
