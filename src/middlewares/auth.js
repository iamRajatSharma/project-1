const jwt = require("jsonwebtoken")
const User = require("../models/User")

const validateToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        const checkToken = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = checkToken.userId;
        req.role = checkToken.role;
        next()
    }
    catch (e) {
        return res.json(e)
    }
}

const checkRole = async (req, res, next) => {
    try {
        const assignRole = await User.findOne({ _id: req.userId })
        if (assignRole.role == "ADMIN") {
            req.role = "ADMIN"
            next()
        }
        else {
            return res.json({ message: "You are not the authorized person for this action" })
        }
    }
    catch (e) {
        return res.json(e)
    }
}

module.exports = { validateToken, checkRole }