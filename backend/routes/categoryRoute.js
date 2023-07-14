const express = require('express');
const { createCategory, updateCategory, deleteCategory, getCategory, getallCategories } = require('../controller/categoryCtrl');
const {  isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post("/create-category", createCategory)
router.put("/:id", isAdmin, updateCategory)
router.delete("/:id", isAdmin, deleteCategory)
router.get("/:id", getCategory)
router.get("/" ,getallCategories)
module.exports = router;