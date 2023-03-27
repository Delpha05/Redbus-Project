const mongoose = require('mongoose');

passengerSchema = new mongoose.Schema({
     passenger_id: {
        type: 'string',
        required: true,
        unique: true
    },
    passenger_fname: {
        type: 'string',
        require: true
    },
    passenger_lname: {
        type: 'string',
        require: true
    },
    passenger_email: {
        type: 'string',
        require: true
    },
    passenger_gender: {
        type: 'string',
        require: true
    },
    passenger_age: {
        type: 'number',
        require: true
    },
    passenger_phone: {
        type: 'number',
        require: true
    },
reservation_id: {
    type:'string'
}
});

module.exports = passenger = mongoose.model('passenger', passengerSchema);