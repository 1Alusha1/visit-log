import express from "express";
import { connectToMongo } from "./db/connect.js";
import authRouter from "./routes/auth.route.js";
import groupRouter from "./routes/group.route.js";
import studentsRouter from "./routes/students.route.js";
import userRouter from "./routes/user.route.js";

const app = express();
app.use(express.json());
app.use("/auth", authRouter);
app.use("/group", groupRouter);
app.use("/students", studentsRouter);
app.use("/user", userRouter);

connectToMongo(app);
