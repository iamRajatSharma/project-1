const Product = require("../models/Product");

const getProduct = async (req, res) => {
    try {
        const products = await Product.find()
        console.log("products")

        return res.json({ message: "Product fetched Successfully", products: products })
    }
    catch (e) {
        console.log('error')
        return res.json({ e })
    }
}

const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock, image, addBy } = req.body;
        const checkProduct = await Product.findOne({ name, description })
        if (checkProduct) {
            return res.json({ message: "Product with this details already registered with us." })
        }

        const product = new Product()
        product.name = name;
        product.description = description;
        product.price = price
        product.category = category
        product.stock = stock
        product.image = image
        product.addBy = addBy
        product.save();

        return res.json({ message: "Product created Successfully", product: product })
    }
    catch (e) {
        return res.json({ e })
    }
}



module.exports = { addProduct, getProduct }