const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/authMiddleware");
const {
  getAllUsers,
  updateUserRole,
  deleteUser,
  createUserByAdmin,
  getAdminDashboard
} = require("../controllers/adminController");
const { getAdminAnalytics } = require("../controllers/adminAnalyticsController");

// Admin Routes
router.get("/users", protect, authorize("admin"), getAllUsers);
router.patch("/users/:id/role", protect, authorize("admin"), updateUserRole);
router.delete("/users/:id", protect, authorize("admin"), deleteUser);
router.post("/users", protect, authorize("admin"), createUserByAdmin);

// Admin Dashbourd Route
router.get(
  "/dashboard",
  protect,
  authorize("admin"),
  getAdminDashboard
);

router.get("/analytics", protect, authorize("admin"), getAdminAnalytics);

module.exports = router;
