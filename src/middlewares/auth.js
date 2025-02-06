const jwt = require("jsonwebtoken")

const checkRole = async (req, res, next) => {
    try {
        const token = req.headers.authorization

        const checkToken = jwt.verify(token, process.env.JWT_SECRET)
        console.log(checkToken)

        next()
    }
    catch (e) {
        return res.json(e)
    }
}

module.exports = { checkRole }