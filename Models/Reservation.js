const mongoose = require('mongoose');

reservationSchema = new mongoose.Schema({
    reservation_id: {
        type: 'string',
        require: true,
    },
    passenger_id: {
        type: 'string',
        require: true,
        // $lookup:{}
    },
    bus_id: {
        type: 'string',
        require: true
    },
    departure_time: {
        type: Date,
        require: true
    },
    arrival_time: {
        type: Date,
        require: true
    },
    source_station: {
        type: 'string',
        require: true
    },
    destination_station: {
        type: 'string',
        require: true
    },
    reservation_date: {
        type: Date,
        require: true
    },
});

module.exports = reservation = mongoose.model('reservation', reservationSchema);