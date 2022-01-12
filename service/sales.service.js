const Joi = require('@hapi/joi');
const models = require('../model/sales.model');
const errorConstructor = require('../utils/errorHandling');
const { unprocessableEntity, notFound } = require('../utils/statusCode');

const schema = Joi.array().items(Joi.object({
  productId: Joi.string().alphanum().max(24).min(24)
  .required(),
  quantity: Joi.number().integer().min(1).required()
  .messages({
  'number.base': 'Wrong product ID or invalid quantity',
  'number.min': 'Wrong product ID or invalid quantity',
  }),
}));

const createSale = async (sales) => {
  const itensSold = sales;

  const { error } = schema.validate(sales);
  if (error) throw errorConstructor(unprocessableEntity, error.message, 'invalid_data');

  const saleId = await models.insertSale(itensSold);
  const newSale = {
    _id: saleId,
    itensSold,
  };
  
  return newSale;
};

const getAll = async () => {
  const sales = await models.findSales(); 
  const allSales = {
    sales,
  };

  return allSales;
};

const getById = async (id) => {
  if (id.length !== 24) throw errorConstructor(notFound, 'Sale not found', 'not_found');

  const product = await models.findSaleById(id);

  if (!product) throw errorConstructor(notFound, 'Sale not found', 'not_found');

  return product;
};

const editById = async (id, sale) => {
  const itensSold = sale;

  const { error } = schema.validate(sale);
  if (error) throw errorConstructor(unprocessableEntity, error.message, 'invalid_data');

  const { ops } = await models.replaceSaleById(id, itensSold);
  
  const editedProduct = {
    _id: id,
    ...ops[0],
  };

  return editedProduct;
};

const deleteById = async (id) => {
  if (id.length !== 24) {
    throw errorConstructor(unprocessableEntity, 'Wrong sale ID format', 'invalid_data');
  }

  const sale = await models.findSaleById(id);
  const { deletedCount } = await models.deleteSale(id);

  if (deletedCount === 0) {
    throw errorConstructor(unprocessableEntity, 'Wrong sale ID format', 'invalid_data');
  }
  
  return sale;
};

module.exports = {
  createSale,
  getAll,
  getById,
  editById,
  deleteById,
};
