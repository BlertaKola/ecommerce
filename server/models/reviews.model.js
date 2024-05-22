const mongoose = require("mongoose")
const ReviewSchema = new mongoose.Schema({
    content :{
        type: String,
        default: ""
    },
    product_id : {
        type: mongoose.Schema.ObjectId,
        ref: "Product"
    },
    user_id : {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model('Review', ReviewSchema);
