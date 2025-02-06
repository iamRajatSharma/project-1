const { signUp, signIn } = require("../controllers/auth");

const express = require("express")
const authRouter = express.Router();

authRouter.post("/signup", signUp)
authRouter.post("/signin", signIn)

module.exports = { authRouter } 