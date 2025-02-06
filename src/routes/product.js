const express = require("express");
const { addProduct, getProduct, myProduct, getProductById, deleteProduct, updateProduct } = require("../controllers/product");
const productRouter = express.Router();
const { checkRole, validateToken } = require("../middlewares/auth")

productRouter.post("/", validateToken, checkRole, addProduct)
productRouter.get("/myProducts", validateToken, checkRole, myProduct)
productRouter.get("/", getProduct)
productRouter.get("/:productId", getProductById)
productRouter.delete("/:productId", validateToken, checkRole, deleteProduct)
productRouter.patch("/:productId", validateToken, checkRole, updateProduct)



module.exports = { productRouter } 