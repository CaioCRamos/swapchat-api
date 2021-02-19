const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        maxlength: 25
    },
    password: {
        type: String,
        required: true,
        trim: true,
        maxlength: 300
    },
    securityQuestion: {
        type: String,
        required: false,
        trim: true,
        maxlength: 200
    },
    securityAnswer: {
        type: String,
        required: false,
        trim: true,
        maxlength: 100
    }
});

module.exports = mongoose.model("User", schema);