import express from "express";
import userRouter from "./controllers/userController";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import "dotenv/config";

const DB_URL = `${process.env.MONGODB_URL}/devbootcamp`;

export const app = express();

/**
 * Parse requests bodies as json
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * Main user Route
 */
app.use("/api/user", userRouter);

/**
 * MongoDB connection
 */
(async () => {
  try {
    await mongoose.connect(DB_URL);
  } catch (error) {
    console.error(error);
  }
})();
