const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./../models/user");
const SECRET_KEY = process.env.SECRET_KEY || "lalala this isnt secure";

const register = async (req, res) => {
  const { username, email, password } = req.body;

  const existingUserByEmail = await User.findOne({ email: email });
  if (existingUserByEmail) {
    return res
      .status(409)
      .send({ error: "409", message: "Email already in use" });
  }

  const existingUserByUsername = await User.findOne({ username: username });
  if (existingUserByUsername) {
    return res
      .status(409)
      .send({ error: "409", message: "Username already taken" });
  }

  try {
    if (!password) throw new Error("Password cannot be empty");

    const hash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hash,
    });

    const { _id } = await newUser.save();
    const accessToken = jwt.sign({ _id }, SECRET_KEY);

    res.status(201).send({ accessToken });
  } catch (error) {
    res
      .status(400)
      .send({ error: error.message, message: "Could not create user" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    const validatedPass = await bcrypt.compare(password, user.password);
    if (!validatedPass) throw new Error();
    const accessToken = jwt.sign({ _id: user._id }, SECRET_KEY);
    res.status(200).send({ accessToken });
  } catch (error) {
    res
      .status(401)
      .send({ error: "401", message: "Username or password is incorrect" });
  }
};

// const userPosts = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id).populate("places");
//     res.status(200).send(user.places);
//   } catch (error) {
//     res.status(404).send({ error, message: "User not found" });
//   }
// }

const profile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("posts");
    if (!user) {
      res.status(404).send({ message: "User not found" });
      return;
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ error, message: "An error occurred" });
  }
};

const logout = (req, res) => {
  res.status(200).send({ accessToken: null });
};

module.exports = { register, login, profile, logout };
