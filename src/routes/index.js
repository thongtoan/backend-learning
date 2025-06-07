import express from "express";
import accessRoutes from "./access/index.js";
import { apiKey, permission } from "../auth/checkAuth.js";

const router = express.Router();

router.use(apiKey);
router.use(permission("0000"));

router.use("/v1/api", accessRoutes);

export default router;
