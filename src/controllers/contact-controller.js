const repository = require("../repositories/contact-repository");
const contactService = require("../services/contact-service");
const authService = require("../services/auth-service");

exports.create = async (req, res) => {
    try {
        const { nome, celular } = req.body;
        const { id } = authService.getUserData(req);

        await repository.create({
            user: id,
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
        const { id } = authService.getUserData(req);

        const result = await contactService.getAll(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            mensagem: "Sua requisição falhou!",
            erro: error.message
        });
    }
}