import { Router } from "express";
import { controlVisit } from "../controllers/user.controller.js";
const router = Router();

router.post("/controle-visit", controlVisit);

export default router;
