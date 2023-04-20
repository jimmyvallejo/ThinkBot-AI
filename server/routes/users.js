var express = require("express");
var router = express.Router();
const User = require("../models/User.model");

router.get("/", (req, res) => {
  
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    });
});


router.patch("/add-to-liked/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const likeData = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { liked: likeData } },
      { new: true, useFindAndModify: false }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
