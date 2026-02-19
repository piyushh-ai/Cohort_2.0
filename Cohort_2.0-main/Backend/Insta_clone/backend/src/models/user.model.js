const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "username already exist"],
    required: [true, "username is require"],
  },
  email: {
    type: String,
    unique: [true, "email already exist"],
    required: [true, "email is require"],
  },
  password: String,
  profileImage: {
    type: String,
    default: "https://www.shutterstock.com/search/default-profile",
  },
  bio: String,
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
