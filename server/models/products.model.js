const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: [
            true,
            "Product name is required"
        ], unique: true
    },
    product_price: {
        type: Number,
        required: [
            true,
            "Price is required"
        ]
    },
    product_quantity: {
        type: Number
    },
    product_description: { 
        type: String
    },
    product_image : {
        type: String,
        default: ""
    },
    isArchived: {
        type: Boolean,
        default: false
    },
    category_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Category"
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }
    
}, { timestamps: true });



module.exports = mongoose.model('Product', ProductSchema);