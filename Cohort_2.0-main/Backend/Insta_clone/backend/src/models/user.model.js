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
  password: {
    type:String,
    select:false
  },
  profileImage: {
    type: String,
    default: "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg",
  },
  bio: String,
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
