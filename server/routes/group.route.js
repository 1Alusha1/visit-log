import { Router } from "express";
import { getGroups, getOwnGroup } from "../controllers/group.controller.js";
const router = Router();

router.get("/get-groups", getGroups);
router.post("/get-own-group", getOwnGroup);

export default router;
