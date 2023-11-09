import express from "express";
import { connectToMongo } from "./db/connect.js";
import authRouter from "./routes/auth.route.js";

const app = express();
app.use(express.json());
app.use("/auth", authRouter);

connectToMongo(app);
