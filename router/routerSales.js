const express = require('express');
const controllers = require('../controller/sales.controller');

const routerProducts = express.Router();

routerProducts.post('/', controllers.newSale);

module.exports = routerProducts;