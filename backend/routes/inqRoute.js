const express = require("express");
const {
  createInquiry,
  updateInquiry,
  deleteInquiry,
  getInquiry,
  getallInquiry,
} = require("../controller/inqCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", createInquiry);
router.put("/:id", authMiddleware, isAdmin, updateInquiry);
router.delete("/:id", authMiddleware, isAdmin, deleteInquiry);
router.get("/:id", getInquiry);
router.get("/", getallInquiry);

module.exports = router;