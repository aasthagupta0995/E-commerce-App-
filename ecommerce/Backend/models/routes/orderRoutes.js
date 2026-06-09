const express = require("express");
const router = express.Router();
const {
  getOrders,
  createOrder,
  updateOrder,
} = require("../controllers/orderController");

router.get("/", getOrders);
router.post("/", createOrder);
router.put("/:id", updateOrder);

module.exports = router;