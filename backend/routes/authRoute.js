const express = require("express");

const {
  createUser,
  loginUserCtrl,
  getallUser,
  getaUser,
  deleteaUser,
  updatedUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdminCtrl,
  getWishlist,
  saveAddress,
  userCart,
  getUserCart,
  emptyCart,
  createOrder,
  getOrders,
  updateOrderStatus,
  getAllOrders,
  removeCartItem,
  updateProductQuantity,
} = require("../controller/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

//Post Requests
router.post("/register", createUser);
router.post("/forgot-password-token", forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);
router.put(
  "/order/update-order/:id",
  authMiddleware,
  isAdmin,
  updateOrderStatus
);

router.put("/password", authMiddleware, updatePassword);
router.post("/login", loginUserCtrl);
router.post("/loginadmin", loginAdminCtrl);
router.post("/cart", authMiddleware, userCart);
router.post("/cart/currency-order", authMiddleware, createOrder);
router.post("/cart/create-order", authMiddleware, createOrder);

//Get Requests
router.get("/all-users", getallUser);
router.get("/get-orders", authMiddleware, getOrders);
router.get("/getallorders", authMiddleware, isAdmin, getAllOrders);
router.post("/getorderbyuser/:id", authMiddleware, isAdmin, getAllOrders);
router.get("/refresh", handleRefreshToken);

router.get("/logout", logout);
router.get("/wishlist", authMiddleware, getWishlist);
router.get("/cart", authMiddleware, getUserCart);

router.post("/cart", authMiddleware, userCart);

router.get("/:id", authMiddleware, isAdmin, getaUser);

//Delete Requests
router.delete("/empty-cart", authMiddleware, emptyCart);
router.delete(
  "/delete-product-cart/:cartItemId",
  authMiddleware,
  removeCartItem
);
router.delete("/:id", deleteaUser);

// Update Requests
router.put("/edit-user", authMiddleware, updatedUser);
router.put("/save-address", authMiddleware, saveAddress);

router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

router.put(
  "/update-quantity/:cartItemId/:quantity",
  authMiddleware,
  updateProductQuantity
);

module.exports = router;
