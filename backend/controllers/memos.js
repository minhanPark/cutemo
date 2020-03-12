import Memo from "../models/memo";
import mongoose from "mongoose";
import Joi from "@hapi/joi";

const { ObjectId } = mongoose.Types;

export const checkObjectId = (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    res.status(400).send("no!");
  }
  return next();
};

export const write = async (req, res) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required()
  });
  const result = schema.validate(req.body);
  console.log(result);
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
    body
  });
  try {
    await memo.save();
    res.json({ memo });
  } catch (e) {
    console.log(e);
  }
};
export const list = async (req, res) => {
  try {
    const memos = await Memo.find();
    // .exec()을 붙여주는 이유는 쿼리를 프로미스로 만들어주기 위해서 였지만
    // 4버전 부터는 안붙여도 프로미스로 나옴
    res.json({ memos });
  } catch (e) {
    console.log(e);
  }
};
export const read = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const memo = await Memo.findById(id);
    if (!memo) {
      res.status(404).send("page not found");
      return;
    }
    res.json({ memo });
  } catch (e) {
    console.log(e);
  }
};
export const remove = async (req, res) => {
  const { id } = req.params;
  try {
    await Memo.findByIdAndRemove(id);
    //status만 보내는건 통신이 끝나질 않는다. 실제 값을 보내줘야함
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
    body: Joi.string()
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
