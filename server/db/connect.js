import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const connectToMongo = (app) => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.DB_URI);
    app.listen(process.env.PORT, () => console.log("server was start"));
    console.log("Connected to Mongo Successfully!");
  } catch (error) {
    console.log(error);
  }
};
