const repository = require("../repositories/user-repository");
const authService = require("../services/auth-service");
const md5 = require("md5");

exports.create = async (req, res) => {
    try {
        const { nome, celular, senha, perguntaSeguranca, respostaSeguranca } = req.body;
        var user = await repository.create({
            name: nome,
            phone: celular,
            password: md5(senha + global.SALT_KEY),
            securityQuestion: perguntaSeguranca,
            securityAnswer: respostaSeguranca
        });

        res.status(201).json({
            id: user.id,
            mensagem: "Usuário cadastrado com sucesso!"
        });
    } catch (error) {
        res.status(500).json({
            mensagem: "Sua requisição falhou!",
            erro: error.message
        });
    }
}

exports.addAccounts = async (req, res) => {
    debugger;
    try {
        const { id, contas } = req.body;

        const accounts = [];
        contas.forEach(conta => {
            accounts.push({
                name: conta.nome,
                email: conta.email,
                image: conta.imagem
            });            
        });

        await repository.addAccounts(id, accounts);

        res.status(200).json({
            mensagem: "Contas adicionadas com sucesso!"
        });
    } catch (error) {
        res.status(500).json({
            mensagem: "Sua requisição falhou!",
            erro: error.message
        });
    }
}

exports.authenticate = async (req, res) => {
    try {
        const { celular, senha } = req.body;
        const user = await repository.getByPhoneAndPassword({
            phone: celular,
            password: md5(senha + global.SALT_KEY)
        });

        if (!user) {
            res.status(404).json({
                mensagem: "Usuário ou senha incorretos!"
            });
            return;
        }

        const token = authService.generateToken({
            id: user.id,
            phone: user.phone,
            name: user.name
        });

        const contas = [];
        user.accounts.forEach(account => {
            contas.push({
                nome: account.name,
                email: account.email,
                imagem: account.image
            });
        })

        res.status(200).json({
            id: user.id,
            nome: user.name,
            contas: contas,
            token: token
        });

    } catch (error) {
        res.status(500).send({
            mensagem: "Sua requisição falhou!",
            erro: error.message
        });
    }
}