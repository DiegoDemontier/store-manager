const Joi = require('@hapi/joi');
const models = require('../model/products.model');
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

  const product = await models.findProductByName(name);

  if (product) throw errorConstructor(unprocessableEntity, 'Product already exists');
  if (error) throw errorConstructor(unprocessableEntity, error.message);

  const productId = await models.insertProduct(name, quantity);

  const newProduct = {
    _id: productId,
    name,
    quantity,
  };

  return newProduct;
};

const getAll = async () => {
  const products = await models.findProducts(); 
  const allProducts = {
    products,
  };

  return allProducts;
};

const getById = async (id) => {
  if (id.length !== 24) throw errorConstructor(unprocessableEntity, 'Wrong id format');

  const product = await models.findProductById(id);

  if (!product) throw errorConstructor(unprocessableEntity, 'Wrong id format');

  return product;
};

const editProduct = async (id, name, quantity) => {
  const { error } = schema.validate({
    name, quantity,
  });

  if (error) throw errorConstructor(unprocessableEntity, error.message);
  
  const { ops } = await models.replaceProductById(id, name, quantity);
  
  const editedProduct = {
    _id: id,
    ...ops[0],
  };

  return editedProduct;
};

module.exports = {
  createProduct,
  getAll,
  getById,
  editProduct,
};
