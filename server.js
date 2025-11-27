const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db")
const menuRoutes = require("./routes/menuRoutes")
const orderRoutes = require("./routes/orderRoutes")

dotenv.config();
const app = express();
app.use(express.json());


// DB Connection 
connectDB()

app.use('/api/menu', menuRoutes)
app.use('/api/orders', orderRoutes)

app.get("/", (req, res) => {
    res.send("Restaurant Management System API running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
