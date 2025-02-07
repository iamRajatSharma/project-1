const express = require("express");
const { getCart, addToCart, clearCart, removeCartItem, updateCartItem } = require("../controllers/cart");
const cartRouter = express.Router();
const { validateToken } = require("../middlewares/auth")

cartRouter.get("/", validateToken, getCart); // done
cartRouter.post("/", validateToken, addToCart); // done 
cartRouter.put("/:productId", validateToken, updateCartItem);
cartRouter.delete("/:productId", validateToken, removeCartItem);
cartRouter.delete("/", validateToken, clearCart);  // done

module.exports = { cartRouter }