const Joi = require('@hapi/joi');
const saleModel = require('../model/sales.model');
const productModel = require('../model/products.model');
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

const validateSale = (sale) => {
  const { error } = schema.validate(sale);
  if (error) throw errorConstructor(unprocessableEntity, error.message, 'invalid_data');
};

const handleQuantity = async (sale) => {
  // REF: https://stackoverflow.com/questions/37576685/using-async-await-with-a-foreach-loop
  await Promise.all(sale.map(async ({ productId, quantity }) => {
    const contents = await productModel.findProductById(productId);
    
    if (!contents) {
      throw errorConstructor(unprocessableEntity, 'Wrong product ID', 'invalid_data');
    }

    const total = contents.quantity - quantity;

    if (total >= 0) {
      await productModel.replaceProductById(productId, total, contents.name);
    } else {
      throw errorConstructor(notFound, 'Such amount is not permitted to sell', 'stock_problem');
    }
  }));
};

const createSale = async (sale) => {
  validateSale(sale);
  await handleQuantity(sale);

  const itensSold = sale;
  const saleId = await saleModel.insertSale(itensSold);
  const newSale = {
    _id: saleId,
    itensSold,
  };
  
  return newSale;
};

const getAll = async () => {
  const sales = await saleModel.findSales(); 
  const allSales = {
    sales,
  };

  return allSales;
};

const getById = async (id) => {
  if (id.length !== 24) throw errorConstructor(notFound, 'Sale not found', 'not_found');

  const getSale = await saleModel.findSaleById(id);

  if (!getSale) throw errorConstructor(notFound, 'Sale not found', 'not_found');

  return getSale;
};

const editById = async (id, sale) => {
  const itensSold = sale;

  const { error } = schema.validate(sale);
  if (error) throw errorConstructor(unprocessableEntity, error.message, 'invalid_data');

  const { ops } = await saleModel.replaceSaleById(id, itensSold);
  
  const editedSale = {
    _id: id,
    ...ops[0],
  };

  return editedSale;
};

const deleteById = async (id) => {
  if (id.length !== 24) {
    throw errorConstructor(unprocessableEntity, 'Wrong sale ID format', 'invalid_data');
  }
  
  const sale = await saleModel.findSaleById(id);
  
  if (!sale) {
    throw errorConstructor(unprocessableEntity, 'Wrong sale ID format', 'invalid_data');
  }

  const { itensSold } = sale;
  const removeQuantity = itensSold.map((item) => ({ 
    productId: item.productId,
    quantity: item.quantity * (-1),
  }));

  await handleQuantity(removeQuantity);
  
  await saleModel.deleteSale(id);
  return sale;
};

module.exports = {
  createSale,
  getAll,
  getById,
  editById,
  deleteById,
};
