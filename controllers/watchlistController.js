import WatchList from "../models/WatchList.js";
import User from "../models/User.js";

export const createWatchlist = async (req, res) => {
  const { name } = req.body;

  const list = await WatchList.create({ name });
  const user = await User.findById(req.user_id);

  if (user) {
    if (list) {
      user.watchlist.push(list._id);
      await user.save();

      res.status(200).json(list._id);
    } else {
      res.status(501);
      throw new Error("Internal server error");
    }
  }
};

export const pushMovie = async (req, res) => {
  const { watchlist, movie } = req.body;

  const isUser = await User.findById(req.user_id);

  if (!isUser) {
    res.status(404);
    throw new Error("User do not exist");
  } else {
    const list = await WatchList.findById(watchlist);

    if (list) {
      list.watchlist.push(movie);

      await list.save();

      res.status(200).send(list);
    } else {
      res.status(501);
      throw new Error("Internal server error");
    }
  }
};

export const changeStatus = async (req, res) => {
  const { watchlist } = req.body;

  const isUser = await User.findById(req.user_id);

  if (!isUser) {
    res.status(404);
    throw new Error("User do not exist");
  } else {
    const list = await WatchList.findById(watchlist);

    if (list) {
      list.isPublic = !list.isPublic;
      await list.save();

      res.status(200).send(list);
    } else {
      res.status(501);
      throw new Error("Internal server error");
    }
  }
};

export const sendWatchlist = async (req, res) => {
  const isUser = await User.findById(req.user_id)
    .select({ watchlist: 1 })
    .populate("watchlist");

  if (!isUser) {
    res.status(404);
    throw new Error("User do not exist");
  } else {
    res.status(200).send(isUser);
  }
};

export const sendPublicWatchlist = async (req, res) => {
  const { watchlist } = req.body;

  const list = await WatchList.findById(watchlist);
  if (!list) {
    res.status(404);
    throw new Error("Playlist not found");
  } else {
    if (list.isPublic) {
      res.status(200).send(list);
    } else {
      res.status(404);
      throw new Error("UnAuthorized Access");
    }
  }
};
