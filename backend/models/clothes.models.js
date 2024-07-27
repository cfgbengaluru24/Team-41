const mongoose = require('mongoose');
const clothes = new mongoose.Schema({
    cloth: {
        type: String,
        required: true
    },
    size:{
        type: String,
        required: true,
        enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    },
    age: {
        type: Number,
        required: true
    },
    donatedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'clothes_doner',
    },
    donatedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'inventory',
    },
    donated:{
        type: Boolean,
        default: false,
        required: true
    },
    donatedOn:{
        type: Date,
        default: Date.now,
        required: true
    },
    space:{
        type: Boolean,
    }
});
module.exports = mongoose.model('clothes', clothes);