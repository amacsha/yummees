const Places = require("../models/places.js");

const getPlaces = async (req, res) => {
  try {
    const places = await Places.find();
    res.status(201).json(places);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.error("Server error:", error);
  }
};

const getPlace = async (req, res) => {
  try {
    const place = await Places.findById(req.params.id);
    res.status(201).json(place);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.error("Server error:", error);
  }
};

const createPlace = async (req, res) => {
  try {
    const { name, location, mood, review, rating } = req.body;
    const place = await Places.create(req.body);
    await place.save();
    res.status(201).json(place);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const changeRating = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;
    const place = await Places.findById(id);
    if (place) {
      place.rating = rating;
      await place.save();
      res.status(200).json();
    }
    if (!rating) {
      res.status(400).json({ error: "Rating is required!" });
    } else if (rating < 0 || rating > 5) {
      res.status(400).json({ error: "Rating must be between 0 and 5!" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePlace = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Places.findByIdAndDelete(id);
    if (deleted) {
      res.status(200).json(deleted);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getPlaces,
  createPlace,
  changeRating,
  deletePlace,
  getPlace,
};
