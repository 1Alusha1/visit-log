import { Router } from "express";
import {
  chekStatsStudent,
  controleVisit,
  createGroup,
} from "../controllers/user.controller.js";
import roleMiddleware from "../middleware/role.middleware.js";
const router = Router();

router.post("/controle-visit", controleVisit);
router.post("/create-group", roleMiddleware(["MASTER"]), createGroup);
router.post("/student-stats", chekStatsStudent);
export default router;
