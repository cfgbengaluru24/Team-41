const mongoose = require('mongoose');
const clothes_doner = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
    },
    clothDetails: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'clothes',
    }],
});

module.exports = mongoose.model('clothes_doner', clothes_doner);
