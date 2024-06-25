const { Product } = require('../models')

const getAllProducts = async (req, res, next) => {
    const products = await Product.findAll()
    res.status(200).json(products)
}

module.exports = {
    getAllProducts
}