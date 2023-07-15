const Inquiry = require("../models/inqModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodbId");

const createInquiry = asyncHandler(async (req, res) => {
  try {
    const newInquiry = await Inquiry.create(req.body);
    res.json(newInquiry);
  } catch (error) {
    throw new Error(error);
  }
});
const updateInquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const updatedInquiry = await Inquiry.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedInquiry);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteInquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deletedInquiry = await Inquiry.findByIdAndDelete(id);
    res.json(deletedInquiry);
  } catch (error) {
    throw new Error(error);
  }
});
const getInquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const getaInquiry = await Inquiry.findById(id);
    res.json(getaInquiry);
  } catch (error) {
    throw new Error(error);
  }
});
const getallInquiry = asyncHandler(async (req, res) => {
  try {
    const getallInquiry = await Inquiry.find();
    res.json(getallInquiry);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createInquiry,
  updateInquiry,
  deleteInquiry,
  getInquiry,
  getallInquiry,
};