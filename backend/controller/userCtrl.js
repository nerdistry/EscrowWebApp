const User = require("../models/userModel");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const Order = require("../models/orderModel");

const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const validateMongodbId = require("../utils/validateMongodbId");
const { generateRefreshToken } = require("../config/refreshtoken");
const crypto = require("crypto");
const uniqid = require("uniqid");

const jwt = require("jsonwebtoken");
const { sendEmail } = require("./emailCtrl");

const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    //Create a new user.
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    throw new Error("User already exists.");
  }
});

const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email } = req.body;
  //check if user exists.
  const findUser = await User.findOne({ email });
  if (findUser) {
    const refreshToken = await generateRefreshToken(findUser?._id);
    const updateuser = await User.findByIdAndUpdate(
      findUser._id,
      {
        refreshToken: refreshToken,
      },
      {
        new: true,
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findUser?._id,
      username: findUser?.username,
      email: findUser?.email,
      mobile: findUser?.mobile,
      role: findUser?.role,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid credentials, try again.");
  }
});

const loginAdminCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user exists or not
  const findAdmin = await User.findOne({ email });
  if (findAdmin.role !== "admin") throw new Error("Not Authorised");
  if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findAdmin?._id);
    const updateuser = await User.findByIdAndUpdate(
      findAdmin.id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findAdmin?._id,
      firstname: findAdmin?.firstname,
      lastname: findAdmin?.lastname,
      email: findAdmin?.email,
      mobile: findAdmin?.mobile,
      token: generateToken(findAdmin?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});
// Updating a User.
const updatedUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  console.log(req.user);
  // validateMongodbId(_id);
  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        username: req?.body.username,
        email: req?.body.email,
        mobile: req?.body.mobile,
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

// Save User Address

const saveAddress = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  validateMongodbId(_id);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        address: req?.body?.address,
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

// Get all users

const getallUser = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

// Get a single user.
const getaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongodbId(_id);

  try {
    const getaUser = await User.findById(id);
    res.json({
      getaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Deleting a user.
const deleteaUser = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  validateMongodbId(_id);

  try {
    const deleteaUser = await User.findByIdAndDelete(id);
    res.json({
      deleteaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Handling refresh token.

const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No refresh token in Cookies.");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) throw new Error("No refresh token present in database.");
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("There is something wrong with refresh token.");
    }
    const accessToken = generateToken(user?._id);
    res.json({ accessToken });
  });
});

// Logout function.
const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  // console.log(refreshToken);
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204); // forbidden
  }
  await User.findOneAndUpdate(
    { refreshToken: refreshToken },
    { refreshToken: "" }
  );
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204); // forbidden
});



const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);

  try {
    const block = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "User blocked.",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);

  try {
    const unblock = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "User unblocked.",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  validateMongodbId(_id);
  const user = await User.findById(_id);
  if (password) {
    user.password = password;
    const updatedPassword = await user.save();
    res.json(updatedPassword);
  } else {
    res.json(user);
  }
});

const forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found with this email.");
  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    const resetURL = `Hello <b>${user.firstname}</b>,\n\nPlease click on the link below to reset your password.
    Note that it is only valid for 10 minutes.
    \n\n<a href='http://localhost:5000/api/user/reset-password/${token}'>Click Here</a> to reset your password.\n\n
    If you did not request this email, please ignore it.\n\nThanks,\nTeam EasyBuy. :)`;
    const data ={
      to: email,
      text:"Hey User",
      subject: "Reset Password for EasyBuy",
      htm: resetURL,
    }
    sendEmail(data);
    res.json(token);
  } catch (error) {
    throw new Error(error);
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const {password} = req.body;
  const {token }= req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if(!user) throw new Error("Token is invalid or has expired. Please try again later.");
  user.password = password;
  user.passwordResetToken = undefined; // Because pass is changed.
  user.passwordResetExpires = undefined;
  await user.save();
  res.json(user);
});

const getWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try{
    const findUser = await User.findById(_id).populate("wishlist");
    res.json(findUser);

  }catch(error){
    throw new Error(error);
  }
});

const userCart = asyncHandler(async (req, res) => {
  const { productId, quantity, price } = req.body;
  const { _id } = req.user;
  validateMongodbId(_id);

  try {

  
let newCart = await new Cart({
  userId: _id,
  productId,  price,
  quantity,
}).save();

    res.json(newCart);
  } catch (error) {
    throw new Error(error);
  }
});


const getUserCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(_id);
  try {
    const cart = await Cart.find({ userId: _id }).populate(
      "productId"
    );
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

const removeCartItem = asyncHandler(async (req, res) => { 
  const { _id } = req.user;
  const {cartItemId} = req.params;
  validateMongodbId(_id);
  try {
    const deleteProductFromCart = await Cart.deleteOne({userId:_id, _id:cartItemId,})
    res.json(deleteProductFromCart);
  } catch (error) {
    throw new Error(error);
  }

});

//Update Product Quantity
const updateProductQuantity = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { cartItemId, quantity } = req.params;
  console.log(quantity);
  validateMongodbId(_id);
  try {
    const cartItem = await Cart.findOne({ userId: _id, _id: cartItemId });
    cartItem.quantity = quantity;
    cartItem.save();
    res.json(cartItem);
  } catch (error) {
    throw new Error(error);
  }
});

const emptyCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(_id);
  try {
    const user = await User.findOne({ _id });
    const cart = await Cart.findOneAndRemove({ orderby: user._id });
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

const createOrder = asyncHandler(async (req, res) => {
  const {
    shippingInfo,
    paymentInfo,
    orderItems,
    totalPrice,
    totalPriceAfterDiscount,
  } = req.body;
  const { _id } = req.user;
  try {
    const order = await Order.create({
      shippingInfo,
      paymentInfo,
      orderItems,
      totalPrice,
      totalPriceAfterDiscount,
      user: _id,
    });
    res.json({
      order,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});
const getOrders = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(_id);
  try {
    const userorders = await Order.findOne({ orderby: _id })
      .populate("products.product")
      .populate("orderby")
      .exec();
    res.json(userorders);
  } catch (error) {
    throw new Error(error);
  }
});
const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const alluserorders = await Order.find()
      .populate("products.product")
      .populate("orderby")
      .exec();
    res.json(alluserorders);
  } catch (error) {
    throw new Error(error);
  }
});
const getOrderByUserId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const userorders = await Order.findOne({ orderby: id })
      .populate("products.product")
      .populate("orderby")
      .exec();
    res.json(userorders);
  } catch (error) {
    throw new Error(error);
  }
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const updateOrderStatus = await Order.findByIdAndUpdate(
      id,
      {
        orderStatus: status,
        paymentIntent: {
          status: status,
        },
      },
      { new: true }
    );
    res.json(updateOrderStatus);
  } catch (error) {
    throw new Error(error);
  }
});



module.exports = {
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
  removeCartItem,
  updateProductQuantity,
  emptyCart,
  createOrder,
  getOrders,
  updateOrderStatus,
  getAllOrders,
  getOrderByUserId,
};
