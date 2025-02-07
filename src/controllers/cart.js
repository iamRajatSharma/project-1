const Cart = require("../models/Cart");
const Product = require("../models/Product");

const getCart = async (req, res) => {
    try {
        const userId = req.userId
        const products = await Cart.find({ user: userId })
        return res.json({ message: "Fetched cart product", products: products })
    }
    catch (e) {
        return res.json({ e })
    }
}

const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.userId;

        if (!productId || quantity < 1) {
            return res.status(400).json({ success: false, message: "Invalid input" });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        let cart = await Cart.findOne({ user: userId });
        console.log(cart)
        if (!cart) {
            cart = new Cart({ user: userId, items: [], totalPrice: 0, totalItems: 0 });
        }

        const existingItem = cart.items.find((item) => item.product.toString() === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity, price: product.price });
        }

        cart.totalPrice = cart.items.reduce((total, item) => total + item.quantity * item.price, 0);
        cart.totalItems = cart.items.length;

        console.log(cart)

        await cart.save()
        return res.json({ message: "Product added to cart successfully", products: products })
    }
    catch (e) {
        return res.json({ e })
    }
}

const updateCartItem = async (req, res) => {
    try {
        const { quantity } = req.body;
        const { productId } = req.params;

        let cart = await Cart.findOne({ user: req.userId });

        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }

        const item = cart.items.find((item) => item.product.toString() === productId);
        if (!item) {
            return res.status(404).json({ success: false, message: "Product not found in cart" });
        }

        if (quantity < 1) {
            cart.items = cart.items.filter((item) => item.product.toString() !== productId);
        } else {
            item.quantity = quantity;
        }

        cart.totalPrice = cart.items.reduce((total, item) => total + item.quantity * item.price, 0);
        cart.totalItems = cart.items.length;

        await cart.save();

        res.status(200).json({ success: true, cart });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error });
    }
};

//remove cart item
const removeCartItem = async (req, res) => {
    try {
        const { productId } = req.params

        let cart = await Cart.findOne({ user: req.userId });
        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }

        cart.items = cart.items.filter((item) => item.product.toString() !== productId);

        cart.totalPrice = cart.items.reduce((total, item) => total + item.quantity * item.price, 0);
        cart.totalItems = cart.items.length;

        await cart.save();
        return res.json({ message: "Cart item deleted", cart })
    }
    catch (e) {
        console.log(e)
        return res.json({ e })
    }
}

// clear cart
const clearCart = async (req, res) => {
    try {
        await Cart.findOneAndDelete({ user: req.userId })
        return res.json({ message: "Cart cleared" })
    }
    catch (e) {
        return res.json({ e })
    }
}


module.exports = { getCart, addToCart, clearCart, removeCartItem, updateCartItem }