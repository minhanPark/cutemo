import mongoose from "mongoose";

const { Schema } = mongoose;

const MemoSchema = new Schema({
  title: String,
  body: String,
  publishedDate: {
    type: Date,
    default: Date.now
  }
});

const Memo = mongoose.model("Memo", MemoSchema);
export default Memo;
