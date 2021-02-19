const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    email: {
        type: String,
        required: false,
        trim: true,
        maxlength: 100
    },
    image: {
        type: String,
        required: false,
        trim: true
    }
});

module.exports = mongoose.model("Account", schema);