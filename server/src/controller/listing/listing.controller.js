import product from "../../model/product/product.model.js";
import { errorHandler } from "../../utils/error.js";

export const createProductListing = async (req, res, next) => {
  try {
    const listing = await product.create(req.body);
    res.status(200).json(listing);
  } catch (err) {
   next(errorHandler(500, "Internal Server Error"));
  }
};

export const updateProductListing = async (req, res, next) => {
  const listing = await product.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Product not found"));
   
  }
   console.log("Listing UserRef:", listing.userRef);
  console.log("Request User ID:", req.user.id);
  if (req.user.id !== listing.userRef.toString()) {
    return next(
      errorHandler(403, "You are not authorized to update this product")
    );
  }
  try {
    const updatedListing = await product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true}
    );
    res.status(200).json(updatedListing);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteProductListing = async (req, res, next) => {
  const listing = await product.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Product not found"));
  }
  if (req.user.id !== listing.userRef.toString()) {
    return next(
      errorHandler(403, "You are not authorized to delete this product")
    );
  }
  try {
    await product.findByIdAndDelete(req.params.id);
    res.status(204).json({
      message: "Product deleted successfully",
      null: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
