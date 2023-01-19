import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import databaseConnect from "../config/database.js";
import dotenv from "dotenv";
import listEndpoints from "express-list-endpoints";
import router from "./routes/authRoute.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser"


const app = express();

/* dotenv.congif({
    path : '../config/config.env'
}) */

app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/messenger", router);
const PORT = process.env.PORT || 5000;
//app.use(cors());

databaseConnect();

mongoose.connection.on("connected", () => {
  console.log("Successfully connected to Mongo!");
  app.listen(PORT, () => {
    console.table(listEndpoints(app));
    console.log("app runnning on port: ", PORT);
  });
});

app.on("error", (error) => {
  console.log(`app is stopped : ${error}`);
});
