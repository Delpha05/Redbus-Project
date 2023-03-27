const mongoose = require('mongoose');

paymentSchema = new mongoose.Schema({
    payment_id: {
        type: 'string'
    },
payment_amount: {
    type: 'Number',
    required: true
},
payment_date: {
    type: 'Date'
},
    passenger_id: {
        type: 'string',
        required: true
    },
});

module.exports = payment = mongoose.model('payment', paymentSchema);