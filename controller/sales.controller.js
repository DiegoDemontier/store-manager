const services = require('../service/sales.service');
const { success } = require('../utils/statusCode');

const newSale = async (req, res, next) => {
  try {
    const sale = req.body;
    const getSale = await services.createSale(sale);
    
    return res.status(success).json(getSale);
  } catch (error) {
    console.log(`NEW SALE -> ${error.message}`);

    return next(error);
  }
};

const getAllSales = async (req, res, next) => {
  try {
    const getSales = await services.getAll();
    return res.status(success).json(getSales);
  } catch (error) {
    console.log(`GET ALL SALES -> ${error.message}`);

    return next(error);
  }
};

const getSaleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const getSale = await services.getById(id);

    return res.status(success).json(getSale);
  } catch (error) {
    console.log(`GET SALE BY ID -> ${error.message}`);

    return next(error);
  }
};

const editSaleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sale = req.body;
    const getSale = await services.editById(id, sale);
    
    return res.status(success).json(getSale);
  } catch (error) {
    console.log(`EDIT PRODUCT BY ID -> ${error.message}`);

    return next(error);
  }
};

const deleteSaleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const getSale = await services.deleteById(id);
    
    return res.status(success).json(getSale);
  } catch (error) {
    console.log(`DELETE SALE BY ID -> ${error.message}`);

    return next(error);
  }
};

module.exports = {
  newSale,
  getAllSales,
  getSaleById,
  editSaleById,
  deleteSaleById,
};
