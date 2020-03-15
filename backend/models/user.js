import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserSchema = new Schema({
  username: String,
  hashedPassword: String
});

//인스턴스 메소드
UserSchema.methods.setPassword = async function(password) {
  const hash = await bcrypt.hash(password, 10);
  this.hashedPassword = hash;
};

UserSchema.methods.checkPassword = async function(password) {
  const result = await bcrypt.compare(password, this.hashedPassword);
  return result;
};

UserSchema.methods.serialize = function() {
  const data = this.toJSON();
  delete data.hashedPassword;
  return data;
};

UserSchema.methods.generateToken = function() {
  // 첫번째는 {넣을 데이터}, 두번째는 키, 세번째는 {옵션}
  const token = jwt.sign(
    {
      _id: this.id,
      username: this.username
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d"
    }
  );
  return token;
};

// 스태틱 메소드
UserSchema.statics.findByUsername = function(username) {
  //여기 this는 User 모델
  return this.findOne({ username });
};

const User = mongoose.model("User", UserSchema);
export default User;
