const Product = require("../models/Product");

const getCart = async (req, res) => {
    try {
        const products = await Product.find()
        return res.json({ message: "Fetched cart product", products: products })
    }
    catch (e) {
        return res.json({ e })
    }
}


module.exports = { getCart }