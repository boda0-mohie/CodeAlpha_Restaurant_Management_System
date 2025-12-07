const express = require("express");
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  assignChef,
  assignDelivery
} = require("../controllers/orderController");

const validateStatusChange = require("../middleware/validateStatusChange");
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/", protect, authorize("admin"), getOrders);
router.get("/:id", protect, authorize("admin"), getOrderById);
router.put("/:id/assign-chef", protect, authorize("admin"), assignChef);
router.put("/:id/assign-delivery", protect, authorize("admin"), assignDelivery);
router.put("/:id/status", protect, validateStatusChange, updateOrderStatus);

module.exports = router;
