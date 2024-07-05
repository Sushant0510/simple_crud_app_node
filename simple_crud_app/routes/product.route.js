
const { getProduct, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/product.controller.js');
// const Product = require('../models/product.model.js')

const express = require('express');
const Router = express.Router();



Router.get('/',getProduct);
Router.get('/:id',getProductById);
Router.post('/',createProduct);
Router.put('/:id',updateProduct);
Router.delete('/:id',deleteProduct);



module.exports = Router