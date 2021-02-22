const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    userAccount1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    userAccount2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    messages: [{
        userAccount: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Account',
            required: true
        },
        message: {
            type: String,
            maxlength: 500,
            required: true
        }
    }]
});

module.exports = mongoose.model("Chat", schema);