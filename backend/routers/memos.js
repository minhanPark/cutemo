import express from "express";
import {
  read,
  write,
  update,
  list,
  remove,
  checkObjectId
} from "../controllers/memos";

const memosRouter = express.Router();

memosRouter.get("/", list);
memosRouter.post("/", write);
memosRouter.get("/:id", checkObjectId, read);
memosRouter.delete("/:id", checkObjectId, remove);
memosRouter.patch("/:id", checkObjectId, update);

export default memosRouter;
