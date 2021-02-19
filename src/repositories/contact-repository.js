const Contact = require("../models/Contact");

exports.create = async (data) => {
    const contact = new Contact(data);
    await contact.save();
}

exports.getAllByUserId = async (userAccountId) => {
    return await Contact.find({
        userAccount: userAccountId
    }, "id name phone");
}