import { Router } from "express";
import { createStudent } from "../controllers/students.controller.js";
const router = Router();

router.post("/create-student", createStudent);

export default router;
