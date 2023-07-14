const express = require('express');
const { createBrand, updateBrand, deleteBrand, getBrand, getallCategories } = require('../controller/brandCtrl');
const { isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post("/",isAdmin, createBrand)
router.put("/:id",isAdmin, updateBrand)
router.delete("/:id",isAdmin, deleteBrand)
router.get("/:id", getBrand)
router.get("/" ,getallCategories)
module.exports = router;