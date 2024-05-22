const mongoose = require("mongoose")
const RatingSchema = new mongoose.Schema({
    content :{
        type: String,
        default: ""
    },
    star_rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    user_id : {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model('Rating', RatingSchema);
