import express from "express";

const router = express.Router();

router.get("/", (req, res) => res.send("this is /"));
router.get("/home", (req, res) => res.send("this is Home"));
router.get("/join", (req, res) => res.send("this is Join"));

export default router;
