const express = require("express");
const { addProduct, getProduct } = require("../controllers/product");
const productRouter = express.Router();
const { checkRole } = require("../middlewares/auth")

productRouter.post("/", addProduct)
productRouter.get("/", checkRole, getProduct)



module.exports = { productRouter } 