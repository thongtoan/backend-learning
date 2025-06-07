import express from "express";
import AccessController from "../../controllers/access.controller.js";
import { asyncHandler } from "../../auth/checkAuth.js";

const router = express.Router();

router.post("/shop/signup", asyncHandler(AccessController.signUp));

export default router;
