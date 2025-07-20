const express = require('express');
const Product = require("../models/product.model.js");
const router = express.Router();
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../controller/product.controller.js');



//To get all products
router.get('/', getProducts);
//To get single product by id
router.get('/:id', getProduct);
//To add a product createProduct = postProduct
router.post('/', createProduct);
//To update the product updateProduct = putProduct 
router.put('/:id', updateProduct)
//To delte the product deleteProduct
router.delete('/:id', deleteProduct)


module.exports = router;

