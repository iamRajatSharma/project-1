const { default: mongoose } = require("mongoose");
const Product = require("../models/Product");

const getProduct = async (req, res) => {
    try {
        const products = await Product.find()
        return res.json({ message: "Product fetched Successfully", products: products })
    }
    catch (e) {
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
        product.name = name
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

const myProduct = async (req, res) => {
    try {
        const products = await Product.find({ addBy: new mongoose.Types.ObjectId(req.userId) })
        return res.json({ message: "My Product fetched Successfully", products: products })
    }
    catch (error) {
        console.log(error)
        return res.json({ message: error })
    }
}


const getProductById = async (req, res) => {
    try {
        const products = await Product.findOne({ _id: req.params.productId })
        return res.json(products)
    }
    catch (error) {
        return res.json({ message: error })
    }
}


const deleteProduct = async (req, res) => {
    try {
        const products = await Product.findOne({ _id: req.params.productId })

        if (!products) {
            return res.json({ message: "Product Not found" })
        }

        if (req.userId != products.addBy) {
            return res.json({ message: "You are not the authenticate person for this action" })
        }

        products.deleteOne()
        return res.json({ message: "Product deleted Successfully", products: products })
    }
    catch (error) {
        return res.json({ message: error })
    }
}

const updateProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock, image } = req.body;
        const product = await Product.findOne({ _id: req.params.productId })

        if (!product) {
            return res.json({ message: "Product Not found" })
        }
        console.log(req.userId)
        console.log(product.addBy)
        if (req.userId != product.addBy) {
            return res.json({ message: "You are not the authenticate person for this action" })
        }

        product.name = name;
        product.description = description;
        product.price = price;
        product.category = category;
        product.stock = stock;
        product.image = ["img-1", "img-2"];
        product.save()


        return res.json({ message: "Product updated Successfully", products: product })
    }
    catch (error) {
        return res.json({ message: error })
    }
}

module.exports = { addProduct, getProduct, myProduct, getProductById, deleteProduct, updateProduct }