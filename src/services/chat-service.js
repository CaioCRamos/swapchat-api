const chatRepository = require("../repositories/chat-repository");
const userRepository = require("../repositories/user-repository");

exports.getAll = async (userAccountId) => {
    const results = [];
    const chats = await chatRepository.getAll(userAccountId);

    for (const chat of chats) {
        let result = {
            id: chat.id
        };

        let userAccountToSearch = chat.userAccount1.toString() === userAccountId
            ? chat.userAccount2.toString()
            : chat.userAccount1.toString();
        
        const user = await userRepository.getByAccountId(userAccountToSearch);

        if (user !== null) {
            const account = user.accounts.find(a => a.id === userAccountToSearch);

            result.nome = `${user.name} (${account.name})`;
            result.image = account.image !== ""
                ? `${process.env.SERVER_URL}/v1/users/accounts/image/${account.image}`
                : "";
        }

        result.ultimaMensagem = "";
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