const Order = require("../models/Order");
const MenuItem = require("../models/MenuItem");

// Create new order
const createOrder = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Order items required" });
    }

    // Calculate total price
    let totalPrice = 0;

    for (let item of items) {
      const menuItem = await MenuItem.findById(item.menuItem);
      if (!menuItem) {
        return res
          .status(404)
          .json({ message: `Menu item not found: ${item.menuItem}` });
      }
      totalPrice += menuItem.price * item.quantity;
    }

    const order = await Order.create({
      items,
      totalPrice,
    });

    const populatedOrder = await Order.findById(order._id).populate(
      "items.menuItem"
    );

    res.status(201).json({
      message: "Order placed successfully",
      order: populatedOrder,
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

// Get all orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ date: 1 })
      .populate("items.menuItem");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

// Get single order
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "items.menuItem"
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (!["pending", "preparing", "served", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    order.status = status;
    await order.save();

    res.json({ message: "Status updated", order });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
};
