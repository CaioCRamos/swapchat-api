const repository = require("../repositories/contact-repository");
const contactService = require("../services/contact-service");

exports.create = async (req, res) => {
    try {
        const { idContaUsuario, nome, celular } = req.body;

        await repository.create({
            userAccount: idContaUsuario,
            name: nome,
            phone: celular
        });

        res.status(201).json({
            mensagem: "Contato adicionado com sucesso!"
        });
    } catch (error) {
        res.status(500).json({
            mensagem: "Sua requisição falhou!",
            erro: error.message
        });
    }
}

exports.getAll = async (req, res) => {
    try {
        const { userAccountId } = req.params;

        const result = await contactService.getAll(userAccountId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            mensagem: "Sua requisição falhou!",
            erro: error.message
        });
    }
}