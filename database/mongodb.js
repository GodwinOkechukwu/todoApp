import mongoose from "mongoose";
import { NODE_ENV, DB_URI } from "../config/env.js";

if (!DB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment varaible inside .env<developemnt/production>.local"
  );
}

const connectToDataBase = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log(`connected to data base in ${NODE_ENV} mode`);
  } catch (err) {
    console.log("error connecting to database", err);
    process.exit(1);
  }
};

export default connectToDataBase;
