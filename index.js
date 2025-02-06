const express = require("express")
const app = express();
const cors = require("cors");
const { authRouter } = require("./src/routes/auth");
const router = require("./src/routes");
require('dotenv').config();
const database = require("./src/utils/database")
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    return res.send({ message: "Everything is working fine" })
})

app.use("/api", router)


app.listen(PORT, (err) => {
    if (!err) {
        console.log(`Server Started on http://localhost:${PORT}`)
    }
})