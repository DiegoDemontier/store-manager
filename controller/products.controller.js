const services = require('../service/products.service');
const { success, created } = require('../utils/statusCode');

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

const getAllProducts = async (req, res, next) => {
  try {
    const products = await services.getAll();

    return res.status(success).json(products);
  } catch (error) {
    console.log(`GET ALL PRODUCT -> ${error.message}`);

    return next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await services.getById(id);

    return res.status(success).json(product);
  } catch (error) {
    console.log(`GET PRODUCT BY ID -> ${error.message}`);

    return next(error);
  }
};

const editProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const product = await services.editById(id, name, quantity);
    
    return res.status(success).json(product);
  } catch (error) {
    console.log(`EDIT PRODUCT BY ID -> ${error.message}`);

    return next(error);
  }
};

const deleteProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await services.deleteById(id);
    
    return res.status(success).json(product);
  } catch (error) {
    console.log(`DELETE PRODUCT BY ID -> ${error.message}`);

    return next(error);
  }
};

module.exports = {
  newProduct,
  getAllProducts,
  getProductById,
  editProductById,
  deleteProductById,
};