import { validationResult } from "express-validator";
import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import groupModel from "../models/group.model.js";
import allOfGroupsModel from "../models/allOfGroups.model.js";
dotenv.config();

const generateAccessToken = (id, username, role) => {
  const payload = {
    id,
    username,
    role,
  };
  return jwt.sign(payload, process.env.SECRET, { expiresIn: "24h" });
};

export const registration = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ message: "Ошибка при регистрации", errors });
    }

    const { username, group, password } = req.body;

    const candidate = await userModel.findOne({ username });

    if (candidate) {
      return res.json({ message: "Пользователь уже зарегестрирован" });
    }

    const hashPassword = bcrypt.hashSync(password, 7);

    const gModel = await groupModel.findOne({ name: group });

    await gModel.updateOne({ monitor: username });

    const user = new userModel({
      username,
      group,
      password: hashPassword,
      role: ["USER"],
    });

    user.save();
    res.status(200).json({ message: "Пользователь успешно зарегестрирован" });
  } catch (error) {
    console.log(error);
    res.json({ message: "Ошибка регестрации" });
  }
};
export const authorization = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Ошибка авторизации,проверьте введенные данные" });
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res
        .status(400)
        .json({ message: "Ошибка авторизации,проверьте введенные данные" });
    }

    const token = generateAccessToken(user._id, username, user.role);

    await user.updateOne({ token: token });
    return res.json(token);
  } catch (error) {
    console.log(error);
    res.json({ message: "Ошибка авторизации" });
  }
};
export const checkAuth = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodeData = jwt.verify(token, process.env.SECRET);
    res.json({ ...decodeData, isAuth: true });
  } catch (err) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: "Пожалуйста авторизуруйтесь",
        isAuth: false,
      });
    }
  }
};

const links = new Map();

export const createRegisterLink = (req, res) => {
  const id = uuidv4();
  const link = {
    link: `${process.env.REGISTER_LINK}${id}`,
  };
  links.set(id, link);
  return res.status(200).json(link);
};

export const deleteRegisterLink = (req, res) => {
  const { id } = req.body;
  const link = links.get(id);
  if (!link)
    return res.status(404).json({ message: "Ссылка не действительна" });

  if (link) links.delete(id);

  return res.status(200).json({ message: "Ссылка больше не действительна" });
};
