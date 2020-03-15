import mongoose from "mongoose";

const { Schema } = mongoose;

const MemoSchema = new Schema({
  title: String,
  body: String,
  publishedDate: {
    type: Date,
    default: Date.now
  },
  user: {
    _id: mongoose.Types.ObjectId,
    username: String
  }
});

const Memo = mongoose.model("Memo", MemoSchema);
export default Memo;
