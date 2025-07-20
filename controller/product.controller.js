const Product = require('../models/product.model.js');


const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});//Product with capital P is where from data is obtaining and
        res.status(200).json(products);         //and the smaal p where we storing and showing at sever 

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getProduct = async (req, res) => {
    try {

        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);

    }
    catch {
        res.status(500).json({ message: error.message })
    }
}

const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({ message: error.message });

    }
}
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product)// checks whetther product exist or not 
        {
            return res.status(404).json({ message: "Product not found" });

        }
        const upadatedProduct = await Product.findById(id);//this will to check product is updated or not

        res.status(200).json(upadatedProduct);

    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }

}
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product)// checksnp whetther product exist or not 
        {
            return res.status(404).json({ message: "product not find" });

        }
        res.status(200).json({ message: "Deleted succesfully" });//to confirm product is deleted

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    getProducts, getProduct, createProduct, updateProduct, deleteProduct
};