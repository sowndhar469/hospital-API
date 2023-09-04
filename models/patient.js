const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    phone: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        
    },
    age: {
        type: Number,

    },
    gender: {
        type: String,

    },
},
    {
        timestamps: true,
    }
);

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;