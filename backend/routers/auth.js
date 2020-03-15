import express from "express";
import { register, login, logout, check } from "../controllers/auth";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/check", check);

export default authRouter;
