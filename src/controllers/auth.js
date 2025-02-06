const { hashSync, compareSync } = require("bcrypt")
const User = require("../models/User")
const jwt = require("jsonwebtoken")


const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const checkUser = await User.findOne({ email: email })
        if (!checkUser) {
            return res.json({ message: "Email is not registered with us." })
        }

        const checkPassword = compareSync(password, checkUser.password)
        if (!checkPassword) {
            return res.json({ message: "Incorrect Email OR Password" })
        }

        const token = jwt.sign({ userId: checkUser._id }, process.env.JWT_SECRET)

        return res.json({ message: "Login Successfully", token })
    }
    catch (e) {
        console.log('error')
        return res.json({ e })
    }
}


const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const checkUser = await User.findOne({ email })
        if (checkUser) {
            return res.json({ message: "Email is alread registered with us." })
        }
        console.log(checkUser)
        const user = new User()
        user.name = name;
        user.email = email;
        user.password = hashSync(password, 10);
        user.save();

        return res.json({ message: "Account created Successfully", user: user })
    }
    catch (e) {
        return res.json(e)
    }
}


module.exports = { signIn, signUp }