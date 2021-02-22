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

        result.ultimaMensagem = chat.messages.length > 0
            ? chat.messages[chat.messages.length -1].message
            : "";

        results.push(result);
    }

    return results;
}