const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  items: [
    {
      menuItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MenuItem",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],

  totalPrice: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    enum: [
      "pending",
      "preparing",
      "ready",
      "on_the_way",
      "delivered",
      "completed",
    ],
    default: "pending",
  },

  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending",
  },

  assignedChef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },

  assignedDelivery: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
