const express = require('express');
const controllers = require('../controller/products.controller');

const routerProducts = express.Router();

routerProducts.get('/', controllers.getAllProducts);
routerProducts.get('/:id', controllers.getProductById);
routerProducts.post('/', controllers.newProduct);

module.exports = routerProducts;