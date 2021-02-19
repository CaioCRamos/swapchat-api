const chatRepository = require("../repositories/chat-repository");
const userRepository = require("../repositories/user-repository");

exports.getAll = async (userAccountId) => {
    const results = [];
    const chats = await chatRepository.getAll(userAccountId);

    for (const chat of chats) {
        const result = {
            id: chat.id
        }

        if (chat.userAccount1.id === userAccountId) {
            result.nome = chat.userAccount2.name;
            result.image = chat.userAccount2.image !== ""
                ? `${process.env.SERVER_URL}/v1/users/accounts/image/${chat.userAccount2.image}`
                : "";
        } else {
            result.nome = chat.userAccount1.name;
            result.image = chat.userAccount1.image !== ""
                ? `${process.env.SERVER_URL}/v1/users/accounts/image/${chat.userAccount1.image}`
                : "";
        }

        result.mensagens = [];
        chat.messages.forEach(message => {
            result.mensagens.push({
                usuario: message.user,
                mensagem: message.message
            });
        });

        results.push(result);
    }

    return results;
}