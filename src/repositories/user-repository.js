const User = require("../models/User");

exports.create = async(data) => {
    const user = new User(data);
    await user.save();
}

exports.getByPhoneAndPassword = async (data) => {
    return await User.findOne({
        phone: data.phone,
        password: data.password
    });
}