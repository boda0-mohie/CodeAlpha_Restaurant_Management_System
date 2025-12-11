require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const menuRoutes = require("./routes/menuRoutes");
const orderRoutes = require("./routes/orderRoutes");
const authRoutes = require("./routes/authRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const deliveryRoutes = require("./routes/deliveryRoutes");
const chefRoutes = require("./routes/chefRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

const app = express();

// ----------------------------
// 1) STRIPE WEBHOOK (raw body)
// ----------------------------
app.post(
  "/api/payments/webhook",
  express.raw({ type: "application/json" }),
  require("./controllers/stripeWebhookController").stripeWebhook
);

// ----------------------------
// 2) Global JSON parser
// ----------------------------
app.use(express.json());

// ----------------------------
// 3) Connect DB
// ----------------------------
connectDB();

// ----------------------------
// 4) Normal API Routes
// ----------------------------
app.use("/api/auth", authRoutes);
app.use("/api/payments", paymentRoutes); 
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/chef", chefRoutes);
app.use("/api/delivery", deliveryRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/orders", orderRoutes);

// ----------------------------
// 5) Root
// ----------------------------
app.get("/", (req, res) => {
  res.send("Restaurant Management System API running");
});

// ----------------------------
// 6) Start Server
// ----------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
