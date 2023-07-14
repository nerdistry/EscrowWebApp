const express = require("express");
const {
  createProduct,
  getaProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,
  uploadImages,
} = require("../controller/productCtrl");

const { isAdmin } = require("../middlewares/authMiddleware");
const {
  uploadPhoto,
  productImgResize,
} = require("../middlewares/uploadImages");
const router = express.Router();

//Post Requests
router.post("/", isAdmin, createProduct);
router.put(
  "/upload/:id",
    isAdmin,
  uploadPhoto.array("images", 10),
  productImgResize,
  uploadImages
);

//Get Requests
router.get("/:id", getaProduct);
router.put("/wishlist", addToWishlist);

router.put("/rating", rating);
router.put("/:id", updateProduct);
router.delete("/:id", isAdmin, deleteProduct);
router.get("/", getAllProducts);

module.exports = router;
