var express = require("express");
var router = express.Router();
require("dotenv").config();
const fileUploader = require("../config/cloudinary.config");

const User = require("../models/User.model");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const isAuthenticated = require("../middleware/isAuthenticated");

router.post("/signup", (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: "please fill out all fields" });
  }

  User.findOne({ email: req.body.email })
    .then((foundUser) => {
      if (foundUser) {
        return res.status(400).json({ message: "Email is already taken" });
      } else {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPass = bcrypt.hashSync(req.body.password, salt);

        User.create({
          password: hashedPass,
          email: req.body.email,
          username: req.body.username,
          role: req.body.role,
          age: req.body.age,
          teacher: req.body.teacher,
          name: req.body.fullname,
          profile_image: req.body.profile_image,
        })
          .then((createdUser) => {
            const payload = {
              _id: createdUser._id,
              email: createdUser.email,
              role: createdUser.role,
              age: createdUser.age,
              name: createdUser.name,
              profile_image: createdUser.profile_image,
            };

            const token = jwt.sign(payload, process.env.SECRET, {
              algorithm: "HS256",
              expiresIn: "24hr",
            });
            res.json({ token: token, id: createdUser._id });
          })
          .catch((err) => {
            res.status(400).json(err.message);
          });
      }
    })
    .catch((err) => {
      res.status(400).json(err.message);
    });
});

router.post("/login", (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: "please fill out both fields" });
  }

  User.findOne({ email: req.body.email })
    .then((foundUser) => {
      if (!foundUser) {
        return res
          .status(401)
          .json({ message: "Email or Password is incorrect!!!" });
      }

      const doesMatch = bcrypt.compareSync(
        req.body.password,
        foundUser.password
      );

      if (doesMatch) {
        const payload = {
          _id: foundUser._id,
          email: foundUser.email,
          role: foundUser.role,
          age: foundUser.age,
          name: foundUser.name,
          profile_image: foundUser.profile_image
        };

        const token = jwt.sign(payload, process.env.SECRET, {
          algorithm: "HS256",
          expiresIn: "24hr",
        });
        res.json({
          token: token,
          id: foundUser._id,
          message: `Welcome ${foundUser.email}`,
        });
      } else {
        return res
          .status(402)
          .json({ message: "Email or Password is incorrect" });
      }
    })
    .catch((err) => {
      res.json(err.message);
    });
});


router.post("/add-picture", fileUploader.single("profile_image"),(req, res) => {
  res.json(req.file.path);
});




router.get("/verify", isAuthenticated, (req, res) => {
  return res.status(200).json(req.user);
});

module.exports = router;
