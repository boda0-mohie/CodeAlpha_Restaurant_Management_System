const Order = require("../models/Order");

const getChefDashboard = async (req, res) => {
  try {
    const orders = await Order.find({
      status: { $in: ["pending", "preparing"] },
    }).populate("items.menuItem");

    res.status(200).json({
      totalPending: orders.filter((o) => o.status === "pending").length,
      totalPreparing: orders.filter((o) => o.status === "preparing").length,
      orders,
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const getChefOrders = async (req, res) => {
  try {
    const chefId = req.user.id;
    const orders = await Order.findOne({assignedChef: chefId}).populate("items.menuItem")

    res.status(200).json(orders)
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
}

module.exports = {
  getChefDashboard,
  getChefOrders
};
