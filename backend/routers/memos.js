import express from "express";
import { read, write, update, list, remove } from "../controllers/memos";

const memosRouter = express.Router();

memosRouter.get("/", list);
memosRouter.post("/", write);
memosRouter.get("/:id", read);
memosRouter.delete("/:id", remove);
memosRouter.patch("/:id", update);

export default memosRouter;
