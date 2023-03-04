const mongoose = require("mongoose");

const databaseConnect = () => {
  mongoose
    .connect("mongodb+srv://usuario:usuario@cluster0.heupo.mongodb.net/messenger?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Mongodb Database Connected");
    })
    .catch((error) => {
      console.log(error);
    });
};
module.exports = databaseConnect;
