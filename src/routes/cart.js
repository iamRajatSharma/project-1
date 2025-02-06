
const express = require("express");
const { getCart } = require("../controllers/cart");
const cartRouter = express.Router();

cartRouter.get("/getCart", getCart)

module.exports = { cartRouter } 