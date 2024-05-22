const mongoose = require("mongoose")
const OrderSchema = new mongoose.Schema({
    user_id : {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    status : {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Order', OrderSchema);