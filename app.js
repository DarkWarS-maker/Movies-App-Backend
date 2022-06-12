import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import mongooseConnect from "./config/db.js";
import userRoute from "./routes/UserRoutes.js";
import cookieParser from "cookie-parser";
import listRoute from "./routes/ListRoutes.js";
const app = express();
dotenv.config();

await mongooseConnect();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.set("trust proxy", 1);

app.get("/", (req, res) => res.send("server running"));

app.use("/api/user", userRoute);
app.use("/api/favourites", listRoute);

app.use((error, req, res, next) => {
  console.log(error);
  res.status(400).json({ message: error.message });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("server is running... "));
