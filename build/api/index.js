var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import userRouter from "./controllers/userController.js";
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
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose.connect(DB_URL);
    }
    catch (error) {
        console.error(error);
    }
}))();
export default app;
