import express from "express";
import AccessController from "../../controllers/access.controller.js";
import { asyncHandler } from "../../auth/checkAuth.js";

const router = express.Router();

router.post("/shop/signup", asyncHandler(AccessController.signUp));
router.post("/shop/login", asyncHandler(AccessController.login));

export default router;
