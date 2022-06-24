const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now
        },
    card: {
        type: Schema.Types.ObjectId,
        ref: 'card'
    },
    validated : {
        type: Boolean,
        default: false
    } 
});

const Reservation = mongoose.model('reservation', reservationSchema);
module.exports = Reservation;