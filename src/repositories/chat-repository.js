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
        });
}

exports.getById = async (chatId) => {
    return await Chat.findById(chatId, "id userAccount1 userAccount2 messages");
}

exports.addMessages = async (id, messages) => {
    await Chat
        .findByIdAndUpdate(id, {
            $set: {
                messages: messages
            }
        });
}