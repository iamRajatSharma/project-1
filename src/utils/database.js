const mongoose = require("mongoose")

const conn = mongoose.connect(process.env.DATABASE_URL)

module.exports = conn