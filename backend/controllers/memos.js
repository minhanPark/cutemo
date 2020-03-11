import Memo from "../models/memo";

export const write = async (req, res) => {
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
  // res.json({ a: "b" });
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
export const update = (req, res) => res.send("update");
export const remove = (req, res) => res.send("remove");
