import express from "express";

const router = express.Router();

router.use("/v1/api", require("./access"));

export default router;
