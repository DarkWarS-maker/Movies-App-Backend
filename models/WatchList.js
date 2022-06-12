import mongoose from "mongoose";

const listModel = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
  watchlist: [{}],
});

const WatchList = mongoose.model("WatchList", listModel);
export default WatchList;
