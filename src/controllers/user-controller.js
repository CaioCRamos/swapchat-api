const repository = require("../repositories/user-repository");
const authService = require("../services/auth-service");

const md5 = require("md5");
const fs = require("fs");
const guid = require("guid");
const path = require("path");

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
    try {
        const { id, contas } = req.body;

        const accounts = [];
        contas.forEach(conta => {
            accounts.push({
                name: conta.nome,
                email: conta.email,
                image: conta.imagem !== ""
                    ? new Buffer.from(conta.imagem.split(",")[1], 'base64')
                    : null
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

        res.status(200).json({
            id: user.id,
            nome: user.name,
            contas: getAccounts(user),
            token: token
        });

    } catch (error) {
        res.status(500).send({
            mensagem: "Sua requisição falhou!",
            erro: error.message
        });
    }
}

exports.getById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await repository.getById(id);

        if (!user) {
            res.status(404).json({
                mensagem: "Usuário não encontrado!"
            });
            return;
        }

        res.status(200).json({
            id: user.id,
            nome: user.name,
            contas: getAccounts(user)
        });

    } catch (error) {
        res.status(500).send({
            mensagem: "Sua requisição falhou!",
            erro: error.message
        });
    }
}

exports.getImage = async (req, res) => {
    const { userAccountId } = req.params;
    const filePath = `./images/${userAccountId}.png`;

    if (!fs.existsSync(filePath)) {
        const user = await repository.getByAccountId(userAccountId);

        if (user !== null) {
            const account = user.accounts.find(a => a.id === userAccountId);
            fs.writeFileSync(filePath, account.image, 'base64', function (err) {
                console.log(err);
            });
        }
    }

    const s = fs.createReadStream(filePath);
    s.on('open', function () {
        res.set('Content-Type', "image/png");
        s.pipe(res);
    });
}

function getAccounts(user) {
    const contas = [];
    user.accounts.forEach(account => {
        contas.push({
            id: account.id,
            nome: account.name,
            email: account.email,
            imagem: account.image !== ""
                ? `${process.env.SERVER_URL}/v1/users/accounts/${account.id}/image`
                : ""
        });
    })

    return contas;
}