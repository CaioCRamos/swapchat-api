const userRepository = require("../repositories/user-repository");
const contactRepository = require("../repositories/contact-repository");

exports.getAll = async (userAccountId) => {
    const result = [];
    const contacts = await contactRepository.getAllByUserId(userAccountId);

    for (const contact of contacts) {
        const user = await userRepository.getByPhone(contact.phone);

        if (user !== null) {
            user.accounts.forEach(account => {
                result.push({
                    id: account.id,
                    nome: `${user.name} (${account.name})`,
                    celular: user.phone,
                    imagem: account.image !== ""
                        ? `${process.env.SERVER_URL}/v1/users/accounts/image/${account.image}`
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