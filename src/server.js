
const cors = require("cors")
const mongoose = require("mongoose")

const dotenv = require("dotenv");
const listEndpoints = require("express-list-endpoints");

const express = require("express");
const app = express();


const databaseConnect = require("./../config/database");
const authRouter = require("./routes/authRoute");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
//const messengerRoute = require("./routes/messengerRoute");



/* dotenv.congif({
    path : '../config/config.env'
}) */
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/messenger", authRouter);
const PORT = process.env.PORT || 5000;


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
