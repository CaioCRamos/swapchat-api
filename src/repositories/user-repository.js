const User = require("../models/User");

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
    return await User.findById(id, "id name accounts");
}

exports.getByPhone = async (phone) => {
    return await User.findOne({
        phone: phone
    }, "id name accounts");
}