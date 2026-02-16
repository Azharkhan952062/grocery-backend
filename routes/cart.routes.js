import express from "express";
import { authSeller } from "../middlewares/authSeller.js";
import { updateCart } from "../controllers/cart.controller.js";
import { authUser } from "../middlewares/authUser.js";

const router = express.Router();
router.post("/update", authUser, updateCart);
export default router;

