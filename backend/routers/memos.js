import express from "express";
import {
  read,
  write,
  update,
  list,
  remove,
  getMemoById,
  checkOwnMemo,
} from "../controllers/memos";
import checkLoggedIn from "../lib/checkLoggedIn";

const memosRouter = express.Router();

memosRouter.get("/memos", list);
memosRouter.post("/", checkLoggedIn, write);
memosRouter.get("/:id", getMemoById, read);
memosRouter.delete("/:id", checkLoggedIn, getMemoById, checkOwnMemo, remove);
memosRouter.patch("/:id", checkLoggedIn, getMemoById, checkOwnMemo, update);

export default memosRouter;
