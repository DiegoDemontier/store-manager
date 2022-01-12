const express = require('express');
const controllers = require('../controller/sales.controller');

const routerProducts = express.Router();

routerProducts.post('/', controllers.newSale);
routerProducts.get('/', controllers.getAllSales);
routerProducts.get('/:id', controllers.getSaleById);

module.exports = routerProducts;