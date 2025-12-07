const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middleware/authMiddleware");
const { getChefDashboard, getChefOrders } = require("../controllers/chefController");

router.get(
  "/dashbourd",
  protect,
  authorize("chef"),
  getChefDashboard
);

router.get("/orders", protect, authorize("chef"), getChefOrders);

module.exports = router;
