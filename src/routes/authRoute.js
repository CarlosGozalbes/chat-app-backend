 import express from "express";
import { userRegister } from "../controller/authController.js";

const authRouter = express.Router();

authRouter.post("/user-register", userRegister);

export default authRouter;
