const mongoose = require("mongoose")

const conn = mongoose.connect(process.env.DATABASE_URL)

// mongoose.connection('on', (msg) => {
//     console.log('DB Connected')
// })
// mongoose.error('', (msg) => {
//     console.log('DB Error')
// })

module.exports = conn