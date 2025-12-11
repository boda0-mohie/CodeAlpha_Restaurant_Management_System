const User = require("../models/User");
const Order = require("../models/Order");
const Payment = require("../models/Payment");

const getUserDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // 1) Get all User Orders
    const orders = await Order.find({ user: userId })
      .populate("items.menuItem")
      .sort({ createdAt: -1 });

    // 2) Total Spent (from payment table)
    const payments = await Payment.find({
      user: userId,
      status: "paid"
    });

    const totalSpent = payments.reduce((sum, p) => sum + p.amount, 0);

    // 3) Active orders (not completed)
    const activeOrders = orders.filter(
      (o) => o.status !== "completed"
    );

    // 4) Last order
    const lastOrder = orders[0] || null;

    res.status(200).json({
      user: {
        id: req.user.id,
        role: req.user.role,
      },
      stats: {
        totalOrders: orders.length,
        completedOrders: orders.filter((o) => o.status === "completed").length,
        totalSpent,
      },
      activeOrders,
      lastOrder,
      orderHistory: orders,
    });

  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports = { getUserDashboard }
