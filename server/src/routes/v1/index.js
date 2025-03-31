import express from "express";
import authRoutes from "./api/auth.js";
import productRoutes from "./api/product.js";
import userRoutes from "./api/user.js";

const router = express.Router();


router.use("/auth", authRoutes);
router.use("/product", productRoutes);
router.use("/user", userRoutes);


export default router;
