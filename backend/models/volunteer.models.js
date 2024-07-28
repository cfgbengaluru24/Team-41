const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true,
        min : 0
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    studentsApproved :[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Students'
        }
    ]
});

const Volunteer = mongoose.model('Volunteer', volunteerSchema);

module.exports = Volunteer;
