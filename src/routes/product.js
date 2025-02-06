const express = require("express");
const { addProduct, getProduct, myProduct } = require("../controllers/product");
const productRouter = express.Router();
const { checkRole, validateToken } = require("../middlewares/auth")

productRouter.post("/", validateToken, checkRole, addProduct)
productRouter.get("/myProducts", validateToken, myProduct)
productRouter.get("/", getProduct)



module.exports = { productRouter } 