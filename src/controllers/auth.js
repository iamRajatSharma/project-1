const { hashSync } = require("bcrypt")
const User = require("../models/User")

const signIn = async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body
    return res.json({ email, password })
}


const signUp = async (req, res) => {
    const { name, email, password } = req.body;

    const checkUser = User.findOne({ email })
    if (!checkUser) {
        return res.json({ message: "Email is not registered with us." })
    }
    const user = new User()
    user.name = name;
    user.email = email;
    user.password = hashSync(password, 10);
    user.save();

    return res.json({ message: "Account created Successfully", user: user })
}


module.exports = { signIn, signUp }