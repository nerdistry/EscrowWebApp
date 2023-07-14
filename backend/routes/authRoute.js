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
} = require("../controller/userCtrl");
const { isAdmin} = require("../middlewares/authMiddleware");
const router = express.Router();

//Post Requests
router.post("/register", createUser);
router.post("/forgot-password-token", forgotPasswordToken)
router.put("/reset-password/:token", resetPassword)
router.put("/order/update-order/:id", isAdmin, updateOrderStatus)


router.put("/password", updatePassword);
router.post("/login", loginUserCtrl);
router.post("/admin-login", loginAdminCtrl);
router.post("/cart", userCart);
router.post("/cart/currency-order", createOrder);

//Get Requests
router.get("/all-users", getallUser);
router.get("/get-orders", getOrders);
router.get("/refresh", handleRefreshToken);

router.get("/logout", logout);
router.get("/wishlist", getWishlist);
router.get("/cart", getUserCart);

router.get("/:id", getaUser);



//Delete Requests
router.delete("/empty-cart", emptyCart);
router.delete("/:id", deleteaUser);

// Update Requests
router.put("/edit-user", updatedUser);
router.put("/save-address", saveAddress);

router.put("/block-user/:id", isAdmin, blockUser);
router.put("/unblock-user/:id", isAdmin,unblockUser);


module.exports = router;
