const MenuItem = require("../models/MenuItem");

// Get All Menu Items
const getMenu = async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

// Get Item Details From Menu
const getMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);

    if (!item) return res.status(200).json({ message: "This Item Not Found" });

    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

// Create New Item And Add Menu
const createMenuItem = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    const item = new MenuItem({
      name,
      description,
      price,
      category,
    });

    await item.save();

    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

// Update Item In Menu
const updateMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!item) return res.status(404).json({ message: "Item Not Found" });
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

// Delete Item From Menu
const deleteMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "This Item Not Found" });
    }


    res.status(200).json({ message: "Item Is Deleted Successfully " });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports = {
  getMenu,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
};
