const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    description: String,
    stars: Number,
    createdAt: {
        type: Date,
        default: Date.now
        },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    restaurant:{
        type: Schema.Types.ObjectId,
        ref: 'restaurant'
    }
});

const Review = mongoose.model('review', reviewSchema);
module.exports = Review;