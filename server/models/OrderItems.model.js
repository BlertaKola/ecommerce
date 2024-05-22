const mongoose = require("mongoose")
const OrderItemsSchema = new mongoose.Schema({
    order_id : {
        type: mongoose.Schema.ObjectId,
        ref: "Order"
    },
    product_id : {
        type: mongoose.Schema.ObjectId,
        ref: "Product"
    }
})

module.exports = mongoose.model('OrderItems', OrderItemsSchema);