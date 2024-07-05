const Product = require('../models/product.model.js')

const getProduct = async (req,res)=>{
    try {

        const prod = await Product.find({});
        res.status(200).json(prod)
        
    } catch (error) {
        res.status(500).json({message:error.message});
    } 
};

const getProductById = async (req,res)=>{
    try {
        const prod = await Product.findById(req.params.id);
        res.status(200).json(prod);

    } catch (error) {
        res.status(500).json({message:"Product not found"});
    }
}


const createProduct = async (req,res)=>{
    try {
        
        const prod = await Product.create(req.body);

        res.status(200).json(prod);
    } catch (error) {
        res.status(500).json(error.message);
    }
}


const updateProduct = async (req,res)=>{
    try {
        const prod = await Product.findByIdAndUpdate(req.params.id);
        res.status(200).json(prod);
    } catch (error) {
        res.status(500).json({message:'Product Not found'});
    }
}

const deleteProduct = async (req,res)=>{
    try {

        const prod = await Product.findByIdAndDelete(req.params.id);
        res.status(200).json(prod);
        
    } catch (error) {
        res.status(500).json({message:'Product not found'});

    }
}

module.exports = {getProduct,getProductById,createProduct,updateProduct,deleteProduct}