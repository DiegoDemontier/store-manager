const express = require('express');
const controllers = require('../controller/products.controller');

const routerProducts = express.Router();

routerProducts.post('/', controllers.newProduct);
routerProducts.get('/', controllers.getAllProducts);
routerProducts.get('/:id', controllers.getProductById);
routerProducts.put('/:id', controllers.editProductById);

module.exports = routerProducts;