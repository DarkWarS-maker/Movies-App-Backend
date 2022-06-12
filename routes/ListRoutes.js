import express from "express";
import ash from "express-async-handler";

import {
  createWatchlist,
  pushMovie,
  changeStatus,
  sendWatchlist,
  sendPublicWatchlist,
} from "../controllers/watchlistController.js";
import { isAuth } from "../middleware/isAuth.js";

const listRoute = express.Router();

listRoute.post("/create", isAuth, ash(createWatchlist));
listRoute.post("/update", isAuth, ash(pushMovie));
listRoute.post("/changeStatus", isAuth, ash(changeStatus));
listRoute.post("/getPublicWatchlists", ash(sendPublicWatchlist));
listRoute.get("/getWatchlists", isAuth, ash(sendWatchlist));
export default listRoute;
