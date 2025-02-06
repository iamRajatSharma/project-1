const mongoose = require("mongoose")

const Cart = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
            product: {
                type: mongoose.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                default: 1
            },
            price: {
                type: Number
            }
        }
    ],
    totalPrice: {
        type: Number
    },
    totalItems: {
        type: Number
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("carts", Cart)