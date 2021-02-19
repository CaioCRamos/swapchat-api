const Account = require("../models/Account");

exports.create = async(data) => {
    var account = new Account(data);
    await account.save();
}

exports.getByUserId = async (userId) => {
    return await Account.find({
        user: userId
    }, "id name email image");
}