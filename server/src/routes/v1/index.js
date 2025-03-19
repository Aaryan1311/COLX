const express = require("express");
const authRoutes = require("./api/auth");
const productRoutes = require("./api/product");

const router = express.Router();

// Use routes
router.use("/auth", authRoutes);
router.use("/product", productRoutes);

module.exports = router;
