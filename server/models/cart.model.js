const mongoose = require("mongoose")
const CartSchema = new mongoose.Schema({
    products : [{
        type: mongoose.Schema.ObjectId,
        ref: "Product"
    }],
    user_id : {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model('Cart', CartSchema);
