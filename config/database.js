import mongoose from 'mongoose'

const databaseConnect = () => {
    mongoose.set("strictQuery", false);
    mongoose
      .connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Mongodb Database Connected");
      })
      .catch((error) => {
        console.log(error);
      });
}

export default databaseConnect