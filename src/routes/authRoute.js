 import express from "express";
import { userRegister, userLogin } from "../controller/authController.js";

const router = express.Router();

router.post("/user-register", userRegister);
router.post("/user-login", userLogin);

export default router;
