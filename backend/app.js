import "./db";
import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import dotenv from "dotenv";

import memosRouter from "./routers/memos";

dotenv.config();

const app = express();
app.set("port", process.env.PORT || 4000);

app.use(morgan("dev"));
// 나중에 public이 들어가야함
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use("/", memosRouter);
// 404일땐 어떤 페이지를 보여줘야하지?
app.use((req, res) => {
  res.status(404);
  res.send("Not Found");
});

app.listen(app.get("port"), () => {
  console.log(`http://localhost:${app.get("port")} 에서 작동중`);
});
