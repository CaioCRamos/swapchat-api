const userRepository = require("../repositories/user-repository");
const contactRepository = require("../repositories/contact-repository");

exports.create = async (data) => {
    const contact = await contactRepository.getByUserAndPhone(data.userAccount, data.phone);

    if (contact !== null) 
        return;

    contactRepository.create(data);
}

exports.getAll = async (userAccountId) => {
    const result = [];
    const contacts = await contactRepository.getAllByUser(userAccountId);

    for (const contact of contacts) {
        const user = await userRepository.getByPhone(contact.phone);

        if (user !== null) {
            user.accounts.forEach(account => {
                result.push({
                    id: account.id,
                    nome: `${user.name} (${account.name})`,
                    celular: user.phone,
                    imagem: account.image !== ""
                        ? `${process.env.SERVER_URL}/v1/users/accounts/${account.id}/image`
                        : "",
                    podeConversar: true
                });                
            });
        } else {
            result.push({
                id: "",
                nome: contact.name,
                celular: contact.phone,
                imagem: "",
                podeConversar: false
            });
        }
    }

    return result;
}