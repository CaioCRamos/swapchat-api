const userRepository = require("../repositories/user-repository");
const contactRepository = require("../repositories/contact-repository");

exports.getAll = async (userId) => {
    const result = [];
    
    //const contacts = await contactRepository.getAllByUserId(userId);
    const contacts = await contactRepository.getAll();

    contacts.forEach(contact => {
        // const user = await userRepository.getByPhone(contact.phone);

        // if (!user) {
        //     user.accounts.forEach(account => {
        //         result.push({
        //             nome: account.name,
        //             celular: user.phone,
        //             imagem: "",
        //             podeConversar: true
        //         });
        //     });            
        // } else {
        //     result.push({
        //         nome: contact.name,
        //         celular: contact.phone,
        //         imagem: "",
        //         podeConversar: false
        //     });
        // }

        result.push({
            nome: contact.name,
            celular: contact.phone,
            imagem: "",
            podeConversar: false
        });
    });

    return result;
}