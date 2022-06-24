const Reservation = require('../models/reservation');
const Meal = require('../models/meal');
const User = require('../models/user');
const Card = require('../models/card');


module.exports = {

    index: async (req, res, next) => {
        const restauId = req.body.restauId;
        console.log(restauId);
        const results = await Reservation.find({})
        .populate({ path: 'card', match: { 'restaurant': restauId } })
        res.status(200).json(results);
          

    },
    insert: async (req, res, next) => {
        try {
            const newReservation = new Reservation()
            const cardId = req.body.cardId
            console.log(cardId);
            const card = await Card.findById(cardId);
            newReservation.card = card;
            const reseravtion = await newReservation.save();
            res.status(201).json(reseravtion)
        } catch (error) {

            next(error);
        }
    },
    delete: async (req, res, next) => {
        try {
            const id = req.body.reservationId;

            const deletedreservation = await Reservation.findByIdAndDelete(id);
            res.status(200).json({
                message: "role deleted succesfully !",
                deletedreservation: deletedreservation
            })
        } catch (error) {

            next(error);
        }
    },
    single: async (req, res, next) => {
        try {
            const { id } = req.params;
            const role = await Role.findById(id);
            res.status(200).json(role);
        } catch (error) {

            next(error);
        }
    }

}

