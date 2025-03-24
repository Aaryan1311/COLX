import express from "express";
import product from "../../../model/product/product.model.js";
import { errorHandler } from "../../../utils/error.js";

const router = express.Router();

router.get("/product", async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    let category = req.query.category || "All";
    const categoryOptions = [
      "Books and Education",
      "Stationary",
      "Electronic Gadgets",
      "Clothing and Fashion",
      "Home and Living",
      "Sports and Fitness",
      "Vehicles and Accessories",
      "Beauty and Health",
      "Games",
      "Furniture",
      "Others",
    ];

    if (category === "All") {
      category = [...categoryOptions];
    } else {
      category = req.query.category.split(",");
    }

    const products = await product
      .find({ name: { $regex: search, $options: "i" } })
      .where("category")
      .in(category)
      .skip(page * limit)
      .limit(limit);

    const total = await product.countDocuments({
      category: { $in: category },
      name: { $regex: search, $options: "i" },
    });

    const response = {
      error: false,
      total,
      page: page + 1,
      limit,
      category: categoryOptions,
      products,
    };
    res.status(200).json(response);
  } catch (err) {
    next(errorHandler(500, err.message));
  }
});

export default router;
