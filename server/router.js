const express = require("express");
const router = express.Router();

// place handlers
const placesController = require("./controllers/places");
router.get("/places", placesController.getPlaces);
router.get("/places/:id", placesController.getPlace);
router.post("/places", placesController.createPlace);
router.put("/places/:id", placesController.changeRating);
router.delete("/places/:id", placesController.deletePlace);

// auth handlers
const userController = require("./controllers/user");
const authMiddleware = require("./middlewares/auth");
router.post("/places/register", userController.register);
router.post("/places/login", userController.login);
router.get("/profile", authMiddleware, userController.profile);
router.post("/places/logout", authMiddleware, userController.logout);

module.exports = router;
