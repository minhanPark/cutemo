import jwt, { decode } from "jsonwebtoken";
import User from "../models/user";

const jwtMiddleware = async (req, res, next) => {
  const token = req.cookies["access_token"];
  if (!token) return next();
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      _id: decoded._id,
      username: decoded.username,
    };
    // 토큰이 3.5일 미만으로 남았다면 다시 만들어서 저장한다
    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp - now < 60 * 60 * 24 * 3.5) {
      const user = await User.findById(decoded._id);
      const token = user.generateToken();
      res.cookie("access_token", token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      });
    }
    return next();
  } catch (e) {
    return next();
  }
  next();
};

export default jwtMiddleware;
