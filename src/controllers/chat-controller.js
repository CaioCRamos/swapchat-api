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
        var results = await service.getAll(userAccountId);

        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({
            mensagem: "Sua requisição falhou!",
            erro: error.message
        });
    }
}