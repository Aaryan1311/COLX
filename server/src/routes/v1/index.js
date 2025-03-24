import express from "express";
import authRoutes from "./api/auth.js";
import productRoutes from "./api/product.js";

const router = express.Router();


router.use("/auth", authRoutes);
router.use("/product", productRoutes);

export default router;
