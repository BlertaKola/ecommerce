const mongoose = require("mongoose")
const CategorySchema = new mongoose.Schema({
    name : {
        type: String
    },
    user_id : {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model('Category', CategorySchema);