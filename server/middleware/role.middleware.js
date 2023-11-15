import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export default function (roles) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }

    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res
          .status(403)
          .json({ type: "error", message: "Користувач не авторизований" });
      }
      const { role } = jwt.verify(token, process.env.SECRET);
      let hasRole = false;
      role.forEach((role) => {
        if (roles.includes(role)) {
          hasRole = true;
        }
      });
      if (!hasRole) {
        return res.status(403).json({ message: "У вас нет доступа" });
      }
      next();
    } catch (e) {
      console.log(e);
      return res
        .status(403)
        .json({ type: "error", message: "Користувач не авторизований" });
    }
  };
}
