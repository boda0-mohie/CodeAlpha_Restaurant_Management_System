const express = require('express')
const {getMenu, getMenuItem, createMenuItem, updateMenuItem, deleteMenuItem} = require('../controllers/menuController')

const router  = express.Router()

router.get("/", getMenu)
router.get("/:id", getMenuItem)
router.post("/", createMenuItem);
router.put("/:id", updateMenuItem);
router.delete("/:id", deleteMenuItem);

module.exports = router;