const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
    bus_id: {
         type: 'string',
         required: true
    },
    bus_name: {
        type: 'string',
        required: true
     },
    bus_number: {
        type: 'string',
        required: true
     },
    bus_seats: {
        type: 'Number',
        required: true
    },
    price:
    {
        type: 'Number',
        required: true
    }
});

module.exports = bus = mongoose.model('bus', busSchema);