const mongoose = require("mongoose");
const Chat = require("../models/Chat");

exports.create = async (data) => {
    const chat = new Chat(data);
    await chat.save();
}

exports.getAllByUserAccount = async (userAccountId) => {
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

exports.getByUserAccounts = async (userAccount1, userAccount2) => {
    var id1 = new mongoose.Types.ObjectId(userAccount1);
    var id2 = new mongoose.Types.ObjectId(userAccount2);

    return await Chat
        .findOne({
            $or: [{
                $and: [
                    { userAccount1: id1 },
                    { userAccount2: id2 }
                ]
            }, {
                $and: [
                    { userAccount1: id2 },
                    { userAccount2: id1 }
                ]
            }]
        });
}