const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
} = require('../controllers/productController');

const {
  protect,
  admin,
} = require('../middlewares/authMiddleware');
router.get('/', getProducts);

router.get('/:id', getProductById);


// Admin Route
router.post(
  '/',
  protect,
  admin,
  createProduct
);

module.exports = router;
