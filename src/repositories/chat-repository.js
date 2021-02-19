const mongoose = require("mongoose");
const Chat = require("../models/Chat");

exports.create = async (data) => {
    const chat = new Chat(data);
    await chat.save();
}

exports.getAll = async (userAccountId) => {
    var objId = new mongoose.Types.ObjectId(userAccountId);

    return await Chat
        .find({
            $or: [
                { userAccount1: objId },
                { userAccount2: objId }
            ]
        })
        .populate("userAccount1", "id name email image")
        .populate("userAccount2", "id name email image");
}