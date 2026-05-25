const express = require('express');

const router = express.Router();

const {
  createOrder,
  getMyOrders,
  getOrderById,
} = require('../controllers/orderController');

const {
  protect,
} = require('../middlewares/authMiddleware');


// Create Order
router.post('/', protect, createOrder);

// Get Logged-in User Orders
router.get('/myorders', protect, getMyOrders);

// Get Single Order
router.get('/:id', protect, getOrderById);

module.exports = router;