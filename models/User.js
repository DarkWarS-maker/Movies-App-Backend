import mongoose from "mongoose";

const list = {
  type: mongoose.Types.ObjectId,
  ref: "WatchList",
};

const userModel = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
  watchlist: [list],
});

const User = mongoose.model("User", userModel);
export default User;
