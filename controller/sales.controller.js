const services = require('../service/sales.service');
const { success } = require('../utils/statusCode');

const newSale = async (req, res, next) => {
  try {
    const sales = req.body;
    const product = await services.createSale(sales);
    
    return res.status(success).json(product);
  } catch (error) {
    console.log(`NEW SALE -> ${error.message}`);

    return next(error);
  }
};

const getAllSales = async (req, res, next) => {
  try {
    const sales = await services.getAll();
    return res.status(success).json(sales);
  } catch (error) {
    console.log(`GET ALL SALES -> ${error.message}`);

    return next(error);
  }
};

const getSaleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await services.getById(id);

    return res.status(success).json(product);
  } catch (error) {
    console.log(`GET SALES BY ID -> ${error.message}`);

    return next(error);
  }
};

module.exports = {
  newSale,
  getAllSales,
  getSaleById,
};
