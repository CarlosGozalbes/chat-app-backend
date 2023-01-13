import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import databaseConnect from "../config/database.js";
import dotenv from "dotenv";
import listEndpoints from "express-list-endpoints";
import authRouter from "./routes/authRoute.js";

const app = express();

/* dotenv.congif({
    path : '../config/config.env'
}) */
app.use("/api/messenger", authRouter);
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
