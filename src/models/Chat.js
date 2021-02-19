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
        user: {
            type: String,
            enum: ["usuario1", "usuario2"],
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