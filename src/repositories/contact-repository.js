const Contact = require("../models/Contact");

exports.create = async (data) => {
    const contact = new Contact(data);
    await contact.save();
}

exports.getAllByUserId = async (userId) => {
    return await Contact.find({
        user: userId
    }, "id name phone");
}

exports.getAll = async () => {
    return await Contact.find();
}