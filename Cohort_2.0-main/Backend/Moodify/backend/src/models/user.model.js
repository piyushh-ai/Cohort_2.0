const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "username should be unique"],
    required: [true, "username is require to login"],
  },
  email: {
    type: String,
    unique: [true, "email should be unique"],
    required: [true, "email is require to login"],
  },
  password: {
    type: String,
    required: [true, "password should be unique"],
    select: false,
  },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
