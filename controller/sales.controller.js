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

module.exports = {
  newSale,
};
