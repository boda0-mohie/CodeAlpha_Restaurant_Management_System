const Order = require("../models/Order");
const MenuItem = require("../models/MenuItem");
const User = require("../models/User");

// Create new order
const createOrder = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Order items required" });
    }

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
      user: req.user.id,
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
    // console.log(req.body)

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (
      ![
        "pending",
        "preparing",
        "ready",
        "on_the_way",
        "delivered",
        "completed",
      ].includes(status)
    ) {
      return res.status(400).json({ message: "Invalid status" });
    }

    order.status = status;
    await order.save();

    res.json({ message: "Status updated", order });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const assignChef = async (req, res) => {
  try {
    const { chefId } = req.body;

    // Check chef exists
    const chef = await User.findById(chefId);
    if (!chef || chef.role !== "chef") {
      return res.status(400).json({ message: "Invalid chef ID" });
    }

    // Check order
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.assignedChef = chefId;
    await order.save();

    res.status(200).json({
      message: "Chef assigned successfully",
      order,
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const assignDelivery = async (req, res) => {
  try {
    const {deliveryId} = req.body;

    const delivery = await User.findById(deliveryId);

    if (!delivery || delivery.role !== "delivery")
      return res.status(404).json({ message: "This Id Not Valid" });

    const order = await Order.findById(req.params.id);
    if (!order)
      return res.status(404).json({ message: "This Order Not Found" });

    order.assignedDelivery = deliveryId;

    await order.save();

    res
      .status(200)
      .json({ message: "Order Assingned Successfully To the delivery", order });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  assignChef,
  assignDelivery,
};
