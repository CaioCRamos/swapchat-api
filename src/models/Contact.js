const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    userAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
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
    }
});

module.exports = mongoose.model("Contact", schema);