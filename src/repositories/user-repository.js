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
    }, "id name phone accounts._id accounts.name accounts.email");
}

exports.getById = async (id) => {
    return await User.findById(id, "id name phone accounts._id accounts.name accounts.email");
}

exports.getByPhone = async (phone) => {
    return await User.findOne({
        phone: phone
    }, "id name phone accounts._id accounts.name accounts.email");
}

exports.getByAccountId = async (userAccountId) => {
    var objId = new mongoose.Types.ObjectId(userAccountId);

    return await User.findOne({
        "accounts._id": objId
    }, "id name phone accounts");
}
