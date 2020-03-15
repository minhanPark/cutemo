import User from "../models/user";
import Joi from "@hapi/joi";

export const register = async (req, res) => {
  //회원가입
  const schema = Joi.object({
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(20)
      .required(),
    password: Joi.string().required()
  });
  const result = schema.validate(req.body);
  if (result.error) {
    const { error } = result;
    return res.status(400).json({ code: 400, e: error });
  }
  const { username, password } = req.body;
  try {
    const exists = await User.findByUsername(username);
    if (exists) {
      return res.status(409).json({ code: 409, e: "user aleady exists" });
    }
    const user = new User({
      username
    });
    await user.setPassword(password);
    await user.save();

    //토큰을 쿠키에 저장
    const token = user.generateToken();
    res.cookie("access_token", token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      // 자바스크립트를 통해 쿠키를 조회할 수 없어서 XSS로부터 안전
      httpOnly: true
    });
    // 회원가입 후 응답하는 데이터에서 hashedPassword를 제거함
    return res.json({ data: user.serialize() });
  } catch (e) {
    return res.status(500).json({ code: 500, e });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(401).json({ code: 401, e: "Unauthorized" });
  }
  try {
    const user = await User.findByUsername(username);
    if (!user) {
      return res.status(401).json({ code: 401, e: "user not exists" });
    }
    const valid = await user.checkPassword(password);
    if (!valid) {
      return res.status(401).json({ code: 401, e: "no valid password" });
    }
    const token = user.generateToken();
    res.cookie("access_token", token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      // 자바스크립트를 통해 쿠키를 조회할 수 없어서 XSS로부터 안전
      httpOnly: true
    });
    return res.json({ data: user.serialize() });
  } catch (e) {
    return res.json(500).json({ code: 500, e });
  }
};

export const check = async (req, res) => {
  const { user } = req;
  if (!user) {
    return res.status(401).json({ code: 401, e: "Unauthorized" });
  }
  return res.json({ user });
};

export const logout = async (req, res) => {
  res.cookie("access_token", "");
  res.status(204).json({ code: 204, e: "No Content" });
};
