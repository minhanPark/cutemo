import Memo from "./models/memo";

export default function createFakeData() {
  const memos = [...Array(25).keys()].map(i => ({
    title: `메모 #${i}`,
    body: `메모의 body ${i}`
  }));
  Memo.insertMany(memos, (err, docs) => {
    console.log(docs);
  });
}
