import { Router } from "express";
import {
  authorization,
  checkAuth,
  createRegisterLink,
  deleteRegisterLink,
  registration,
} from "../controllers/auth.controller.js";
import { body } from "express-validator";

const router = Router();

router.post(
  "/registration",
  [
    body("username", "Имя пользователя не может быть пустым").notEmpty(),
    body(
      "password",
      "Пароль должен быть больше 4 и меньше 10 символов"
    ).isLength({ min: 4, max: 10 }),
  ],
  registration
);

router.post("/authorization", authorization);

router.post("/checkAuth", checkAuth);

router.get("/createRegisterLink", createRegisterLink);

router.post("/deleteRegisterLink", deleteRegisterLink);

export default router;
