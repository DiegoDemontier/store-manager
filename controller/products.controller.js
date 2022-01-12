const services = require('../service/products.service');
const { success, created } = require('../utils/statusCode');

const getAllProducts = async (req, res, next) => {
  try {
    const allProducts = await services.getAll();

    return res.status(success).json(allProducts);
  } catch (error) {
    console.log(`GET ALL PRODUCT -> ${error.message}`);

    return next(error);
  }
};

const newProduct = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const product = await services.createProduct(name, quantity);
    
    return res.status(created).json(product);
  } catch (error) {
    console.log(`POST NEW PRODUCT -> ${error.message}`);

    return next(error);
  }
};

module.exports = {
  getAllProducts,
  newProduct,
};