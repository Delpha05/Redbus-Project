const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    _id: {
        type: 'String',
        required: true,
    },
    name: {
        type: 'String',
        required: true,
    },
    age: {
        type: 'Number',
        required: true,
    },
    gender: {
        type: 'String',
        require : true
    },
    phone: {
        type: 'Number',
        required: true
    },
    email: {
        type: 'String',
        required: true
    },
    password: {
        type: "String",
        required: true
    }
    });

const users = mongoose.model('users',UserSchema);
module.exports = users;