const Joi = require('@hapi/joi');
const productModel = require('../model/products.model');
const errorConstructor = require('../utils/errorHandling');
const { unprocessableEntity } = require('../utils/statusCode');

const schema = Joi.object({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().integer().min(1).required(),
});

const createProduct = async (name, quantity) => {
  const { error } = schema.validate({
    name, quantity,
  });

  const product = await productModel.findProductByName(name);

  if (product) {
    throw errorConstructor(unprocessableEntity, 'Product already exists', 'invalid_data');
  }
  if (error) throw errorConstructor(unprocessableEntity, error.message, 'invalid_data');

  const productId = await productModel.insertProduct(name, quantity);

  const newProduct = {
    _id: productId,
    name,
    quantity,
  };

  return newProduct;
};

const getAll = async () => {
  const products = await productModel.findProducts(); 
  const allProducts = {
    products,
  };

  return allProducts;
};

const getById = async (id) => {
  if (id.length !== 24) {
    throw errorConstructor(unprocessableEntity, 'Wrong id format', 'invalid_data');
  }

  const product = await productModel.findProductById(id);

  if (!product) throw errorConstructor(unprocessableEntity, 'Wrong id format', 'invalid_data');

  return product;
};

const editById = async (id, quantity, name) => {
  const { error } = schema.validate({
    name, quantity,
  });

  if (error) throw errorConstructor(unprocessableEntity, error.message, 'invalid_data');
  
  const { ops } = await productModel.replaceProductById(id, quantity, name);
  
  const editedProduct = {
    _id: id,
    ...ops[0],
  };

  return editedProduct;
};

const deleteById = async (id) => {
  if (id.length !== 24) {
    throw errorConstructor(unprocessableEntity, 'Wrong id format', 'invalid_data');
  }

  const product = await productModel.findProductById(id);
  const { deletedCount } = await productModel.deleteProduct(id);

  if (deletedCount === 0) {
    throw errorConstructor(unprocessableEntity, 'Wrong id format', 'invalid_data');
  }
  
  return product;
};

module.exports = {
  createProduct,
  getAll,
  getById,
  editById,
  deleteById,
};
