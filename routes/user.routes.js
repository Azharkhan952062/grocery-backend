import express from "express";
import { isAuthuser, loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { authUser } from "../middlewares/authUser.js";

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout",authUser, logoutUser);
router.get("/is-auth",authUser, isAuthuser);


export default router;