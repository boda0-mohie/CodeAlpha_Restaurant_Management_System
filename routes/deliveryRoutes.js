const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middleware/authMiddleware");
const { getDeliveryDashboard, getDeliveryOrders } = require("../controllers/deliveryController");

router.get(
  "/dashbourd",
  protect,
  authorize("delivery"),
  getDeliveryDashboard
);

router.get("/orders", protect, authorize("delivery"), getDeliveryDashboard);

module.exports = router;
