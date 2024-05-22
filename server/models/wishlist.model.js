const mongoose = require("mongoose")
const WishlistSchema = new mongoose.Schema({
    product_id : {
        type: mongoose.Schema.ObjectId,
        ref: "Product"
    },
    user_id : {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    products : [{
        type: mongoose.Schema.ObjectId,
        ref: "Product"
    }]
})

module.exports = mongoose.model('Wishlist', WishlistSchema);
