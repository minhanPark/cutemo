import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.set("port", process.env.PORT || 4000);

app.use(morgan("dev"));
// 나중에 public이 들어가야함
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

// 404일땐 어떤 페이지를 보여줘야하지?

app.listen(app.get("port"), () => {
  console.log(`${app.get("port")}번 포트에서 대기중`);
});
