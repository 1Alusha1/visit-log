import { Router } from "express";
import { controleVisit, createGroup } from "../controllers/user.controller.js";
import roleMiddleware from "../middleware/role.middleware.js";
const router = Router();

router.post("/controle-visit", controleVisit);
router.post("/create-group", roleMiddleware(["MASTER"]), createGroup);
export default router;
