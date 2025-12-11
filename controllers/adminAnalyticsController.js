const User = require("../models/User");
const Order = require("../models/Order");
const Payment = require("../models/Payment");

exports.getAdminAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const chefs = await User.countDocuments({role: "chef"})
    const deliveries = await User.countDocuments({role: "delivery"})
    const admins = await User.countDocuments({role: "admin"})

    // Orders by status
    const orderStatuses = [
      "pending",
      "preparing",
      "ready",
      "on_the_way",
      "delivered",
      "completed",
      "paid"
    ];
    const orders = {}

    for (let status of orderStatuses) {
      orders[status] = await Order.countDocuments({status})
    }

    // Revenue
    const totalRevenue = await Payment.aggregate([
      { $match: { status: "paid" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayRevenue = await Payment.aggregate([
      {
        $match: {
          status: "paid",
          createdAt: { $gte: today },
        },
      },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // This month revenue
    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);

    const monthRevenue = await Payment.aggregate([
      {
        $match: {
          status: "paid",
          createdAt: { $gte: monthStart },
        },
      },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);


    return res.status(200).json({
      users: {totalUsers,
      chefs,
      deliveries,
      admins,
      },
      orders,
      revenue: {
         total: totalRevenue[0]?.total || 0,
        today: todayRevenue[0]?.total || 0,
        month: monthRevenue[0]?.total || 0,
      }

    })
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
