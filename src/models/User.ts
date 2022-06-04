import mongoose from "mongoose";

const UserSchema: mongoose.Schema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  login: {
    type: String,
    required: true
  },
  password: {
    type: String
  },
  equipment: {
    type: String,
    required: true
  },
  pushToken: {
    type: String
  },
  country: {
    type: String
  },
  viewedFols: {
    type: [String],
    required: false
  }
});

const User = mongoose.model("Users", UserSchema);

export default User;
