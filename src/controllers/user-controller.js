const repository = require("../repositories/user-repository");
const authService = require("../services/auth-service");
const md5 = require("md5");

exports.authenticate = async (req, res) => {
    try {
        const { phone, password } = req.body;
        const user = await repository.getByPhoneAndPassword({
            phone: phone,
            password: md5(password + global.SALT_KEY)
        });

        if (!user) {
            res.status(404).json({
                message: "User or Password incorrect"
            });
            return;
        }

        const token = authService.generateToken({
            id: user.id,
            phone: user.phone,
            nome: user.name
        });

        res.status(200).json({
            id: user.id,
            nome: user.name,
            phone: user.phone,
            token: token
        });

    } catch (error) {
        res.status(500).send({
            message: "Your request has failed",
            data: error.message
        });
    }
}

exports.create = async (req, res) => {
    try {
        const { name, phone, password } = req.body;
        await repository.create({
            name: name,
            phone: phone,
            password: md5(password + global.SALT_KEY)
        });

        res.status(201).json({
            message: "New user created"
        });
    } catch (error) {
        res.status(500).json({
            message: "Your request has failed",
            data: error.message
        });
    }
}