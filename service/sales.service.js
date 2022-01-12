const Joi = require('@hapi/joi');
const models = require('../model/sales.model');
const errorConstructor = require('../utils/errorHandling');
const { unprocessableEntity } = require('../utils/statusCode');

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
  if (error) throw errorConstructor(unprocessableEntity, error.message);

  const saleId = await models.insertSale(itensSold);
  const newSale = {
    _id: saleId,
    itensSold,
  };
  
  return newSale;
};

module.exports = {
  createSale, 
};
