const Product = require('../models/product.model');

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      category,
      images,
      stock,
      material,
      dimensions,
      featured,
    } = req.body;

    const product = await Product.create({
      title,
      description,
      price,
      category,
      images,
      stock,
      material,
      dimensions,
      featured,
      createdBy: req.user._id,
    });

    res.status(201).json(product);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const updateProduct = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }

    const {
      title,
      description,
      price,
      category,
      images,
      stock,
      material,
      dimensions,
      featured,
    } = req.body;

    product.title = title || product.title;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.images = images || product.images;
    product.stock = stock || product.stock;
    product.material = material || product.material;
    product.dimensions = dimensions || product.dimensions;
    product.featured = featured ?? product.featured;

    const updatedProduct = await product.save();

    res.status(200).json(updatedProduct);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const deleteProduct = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }

    await product.deleteOne();

    res.status(200).json({
      message: 'Product deleted successfully',
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};