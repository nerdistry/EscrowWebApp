const express = require('express');
const { createBrand, updateBrand, deleteBrand, getBrand, getallBrands } = require('../controller/brandCtrl');
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get("/:id", getBrand); // Move this route above the next route
router.get("/", getallBrands);
router.post("/", authMiddleware, isAdmin, createBrand);
router.put("/:id",authMiddleware,  isAdmin, updateBrand);
router.delete("/:id",authMiddleware,  isAdmin, deleteBrand);

module.exports = router;