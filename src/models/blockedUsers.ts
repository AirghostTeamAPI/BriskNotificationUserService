import mongoose from "mongoose";

const BlockedUserSchema: mongoose.Schema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  login: {
    type: String,
    required: true
  },
});

const BlockedUser = mongoose.model("BlockedUsers", BlockedUserSchema);

export default BlockedUser;
