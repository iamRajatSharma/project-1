const mongoose = require("mongoose")

const Product = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    category: String,
    stock: Number,
    image: [{
        type: String
    }],
    rating: { type: Number, default: 0 },
    addBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model("products", Product)