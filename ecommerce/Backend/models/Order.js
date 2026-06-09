const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      fullname: String,
      email: String,
    },
    products: [
      {
        name: String,
        quantity: Number,
        price: Number,
      },
    ],
    amount: Number,
    status: {
      type: String,
      enum: ["pending", "dispatched", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);