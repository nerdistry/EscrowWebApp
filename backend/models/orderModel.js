const mongoose = require('mongoose')

// Declare the Schema of the Mongo model
const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required: true,
  }, 
  shippingInfo: {
    firstname:{
        type: String,
        required: true,
    },
    lastname:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    city:{
        type: String,
        required: true,
    },
    state:{
        type: String,
        required: true,
    },
    apartment:{
        type: String,
        required: true,
    },
    pincode:{
        type: Number,
        required: true,
    }
  },
  orderItems: [
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Product",
            required: true,
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }
  ],
 
  totalPrice: {
    type: Number,
    required: true,
  },
  orderStatus: {
    type: String,
    default:"ordered"
  }
}, {
    timestamps: true,
});

//Export the model
module.exports = mongoose.model('Order', orderSchema);