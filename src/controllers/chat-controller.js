const repository = require("../repositories/chat-repository");
const service = require("../services/chat-service");

exports.create = async(req, res) => {
    try {
        const { idContaUsuario1, idContaUsuario2 } = req.body;

        await repository.create({
            userAccount1: idContaUsuario1,
            userAccount2: idContaUsuario2
        });

        res.status(201).json({
            mensagem: "Conversa criada com sucesso!"
        });
    } catch (error) {
        res.status(500).json({
            mensagem: "Sua requisição falhou!",
            erro: error.message
        });
    }
}

exports.getAll = async(req, res) => {
    try {
        const { userAccountId } = req.params;
        const results = await service.getAll(userAccountId);

        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({
            mensagem: "Sua requisição falhou!",
            erro: error.message
        });
    }
}

exports.getMessages = async(req, res) => {
    try {
        const { chatId, userAccountId } = req.params;
        const chat = await repository.getById(chatId);

        const results = [];
        chat.messages.forEach(message => {
            results.push({
                usuario: message.userAccount.toString() === userAccountId
                    ? "usuario1" 
                    : "usuario2", 
                mensagem: message.message
            });
        });

        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({
            mensagem: "Sua requisição falhou!",
            erro: error.message
        });
    }
}

exports.addMessage = async (req, res) => {
    try {
        const { idConversa, idContaUsuario, mensagem } = req.body;
        const chat = await repository.getById(idConversa);

        if (chat !== null) {
            chat.messages.push({
                userAccount: idContaUsuario,
                message: mensagem
            });

            await repository.addMessages(idConversa, chat.messages);
            res.status(200).json({
                mensagem: "Mensagem enviada com sucesso!"
            });
        }
    } catch (error) {
        res.status(500).json({
            mensagem: "Sua requisição falhou!",
            erro: error.message
        });
    }
}