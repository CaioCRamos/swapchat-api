const Contact = require("../models/Contact");

exports.create = async (data) => {
    const contact = new Contact(data);
    await contact.save();
}

exports.getAllByUser = async (userAccountId) => {
    return await Contact.find({
        userAccount: userAccountId
    }, "id name phone");
}

exports.getByUserAndPhone = async (userAccountId, phone) => {
    return await Contact.findOne({
        userAccount: userAccountId,
        phone: phone
    }, "id name phone");
}