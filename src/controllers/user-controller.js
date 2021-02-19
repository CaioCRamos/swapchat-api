const userRepository = require("../repositories/user-repository");
const accountRepository = require("../repositories/account-repository");
const authService = require("../services/auth-service");

const md5 = require("md5");
const fs = require("fs");
const guid = require("guid");
const path = require("path");

exports.create = async (req, res) => {
    try {
        const { nome, celular, senha, perguntaSeguranca, respostaSeguranca } = req.body;
        var user = await userRepository.create({
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
            let fileName = "";

            if (conta.imagem !== "") {
                const rawdata = conta.imagem;
                const matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
                const buffer = Buffer.from(matches[2], 'base64');
                fileName = guid.raw() + ".png";

                var dir = './images';

                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir);
                }

                fs.writeFileSync(`./images/${fileName}`, buffer, 'base64', function (err) {
                    console.log(err);
                });
            }

            accounts.push({
                user: id,
                name: conta.nome,
                email: conta.email,
                image: fileName
            });
        });

        for (const account of accounts) {
            await accountRepository.create(account);
        }

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

exports.getImage = (req, res) => {
    const { filename } = req.params;

    const file = path.join("./images", filename);
    const s = fs.createReadStream(file);
    s.on('open', function () {
        res.set('Content-Type', "image/png");
        s.pipe(res);
    });
}

exports.authenticate = async (req, res) => {
    try {
        const { celular, senha } = req.body;
        const user = await userRepository.getByPhoneAndPassword({
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

        const contas = await getAccounts(user.id);

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

exports.getById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await userRepository.getById(id);

        if (!user) {
            res.status(404).json({
                mensagem: "Usuário não encontrado!"
            });
            return;
        }

        const contas = await getAccounts(id);

        res.status(200).json({
            id: user.id,
            nome: user.name,
            contas: contas
        });

    } catch (error) {
        res.status(500).send({
            mensagem: "Sua requisição falhou!",
            erro: error.message
        });
    }
}

async function getAccounts(userId) {
    const accounts = await accountRepository.getByUserId(userId);

    const contas = [];
    accounts.forEach(account => {
        contas.push({
            id: account.id,
            nome: account.name,
            email: account.email,
            imagem: account.image !== ""
                ? `${process.env.SERVER_URL}/v1/users/accounts/image/${account.image}`
                : ""
        });
    })

    return contas;
}