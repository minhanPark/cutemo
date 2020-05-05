import Memo from "../models/memo";
import mongoose from "mongoose";
import Joi from "@hapi/joi";

const { ObjectId } = mongoose.Types;

export const getMemoById = async (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    res.status(400).send("no!");
  }
  try {
    const memo = await Memo.findById(id);
    if (!memo) {
      res.status(404).json({ code: 404, e: "Not Found" });
      return;
    }
    req.memo = memo;
    return next();
  } catch (e) {
    res.status(500).json({ code: 500, e });
  }
  return next();
};

export const checkOwnMemo = (req, res, next) => {
  const { user, memo } = req;
  if (memo.user._id.toString() !== user._id) {
    res.status(403).json({ code: 403, e: "Unauthorized" });
    return;
  }
  return next();
};

export const write = async (req, res) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    const { error } = result;
    return res.status(400).json({ error });
    // return res.status(404).json({code:404, text: "page not Found"}) 형태로 구성하면 될듯
  }
  // Joi의 경우 @hapi/joi로 다운받운 경우 node12가 아니라서 validateAsync가 에러가 걸리는 듯
  // 또한 책에서와는 달리 schema.validate(값)으로 비교를 했음
  const { title, body } = req.body;
  const memo = new Memo({
    title,
    body,
    user: req.user,
  });
  try {
    await memo.save();
    res.json({ memo });
  } catch (e) {
    console.log(e);
  }
};
export const list = async (req, res) => {
  const page = parseInt(req.query.page || "1", 10);

  if (page < 1) {
    return res.status(400).json({ code: 400, e: "page not found" });
  }
  try {
    const memos = await Memo.find()
      .sort({ _id: -1 })
      .limit(10)
      .skip((page - 1) * 10);

    const memoCount = await Memo.countDocuments();
    res.cookie("Last-Page", Math.ceil(memoCount / 10));
    res.json({ memos });
  } catch (e) {
    console.log(e);
    res.status(500).json({ code: 500, e });
  }
};
export const read = async (req, res) => {
  const memo = req.memo;
  res.json({ memo });
};
export const remove = async (req, res) => {
  const { id } = req.params;
  try {
    await Memo.findByIdAndRemove(id);
    res.status(204).send("Removed");
  } catch (e) {
    console.log(e);
    res.status(500).json({ e });
  }
};
export const update = async (req, res) => {
  const { id } = req.params;
  const schema = Joi.object({
    title: Joi.string(),
    body: Joi.string(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    const { error } = result;
    return res.status(400).json({ error });
  }
  try {
    // 첫번째 파라미터는 id, 두번째 파라미터는 업데이트 내용, 세번째 파라미터는 업데이트의 옵션
    const memo = await Memo.findByIdAndUpdate(id, req.body, { new: true });
    if (!memo) {
      res.status(404).send("no memo");
    }
    res.json({ memo });
  } catch (e) {
    console.log(e);
    res.status(500).json({ e });
  }
};
