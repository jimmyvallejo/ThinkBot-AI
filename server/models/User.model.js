const { Schema, model } = require("mongoose");



const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    profile_image: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/702/702814.png",
    },
    name: String,
    age: Number,
    role: String,
    teacher:  String,
    liked: []
  },
  {
    timeseries: true,
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
