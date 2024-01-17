const mongoose = require("./index");

const Schema = mongoose.Schema;

// const cuisinesSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
// });

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
    // type: Schema.Types.ObjectId,
    // ref: "Cuisine",
  },
  review: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  // rating: {
  //   type: Number,
  //   min: 0,
  //   max: 5,
  //   required: true,
  // },
  likes: {
    type: Number,
    default: 0,
  },
});

const Places = mongoose.model("Places", placesSchema);

module.exports = Places;
