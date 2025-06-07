import express from "express";
import AccessController from "../../controllers/access.controller.js";

const router = express.Router();

router.post("/shop/signup", AccessController.signUp);

export default router;
