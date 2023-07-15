const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var inqSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Submitted",
    enum: ["Submitted", "Contacted", "In Progress", "Resolved"],
  },
});

//Export the model
module.exports = mongoose.model("Inquiry", inqSchema);