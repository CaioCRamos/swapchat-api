const User = require("../models/User");
const mongoose = require("mongoose");

exports.create = async (data) => {
    const user = new User(data);
    await user.save();

    return user;
}

exports.addAccounts = async (id, accounts) => {
    await User
        .findByIdAndUpdate(id, {
            $set: {
                accounts: accounts
            }
        });
}

exports.getByPhoneAndPassword = async (data) => {
    return await User.findOne({
        phone: data.phone,
        password: data.password
    }, "id name accounts");
}

exports.getById = async (id) => {
    return await User.findById(id, "id name phone accounts");
}

exports.getByPhone = async (phone) => {
    return await User.findOne({
        phone: phone
    }, "id name phone accounts");
}

exports.getByAccountId = async  (userAccountId) => {
    var objId = new mongoose.Types.ObjectId(userAccountId);

    return await User.findOne({
        "accounts._id": objId
    });
}