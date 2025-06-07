import mongoose from "mongoose";
import { dbName } from "../utils/dataBaseName.js";

export const connectToDb = async () => {
  try {
    const connection = await mongoose.connect(`${process.env.DB_URL}/${dbName}`);
    console.log("connected to", connection.connection.host);
  } catch (error) {
    console.log("connection failed to connect data base", error);
    process.exit(1);
  }
};
