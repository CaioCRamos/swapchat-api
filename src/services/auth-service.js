const jwt = require("jsonwebtoken");

exports.generateToken = (data) => {
    return jwt.sign(data, global.SALT_KEY, { expiresIn: "30d" });
}

exports.decodeToken = (token) => {
    return jwt.verify(token, global.SALT_KEY);
}

exports.authorize = (req, res, next) => {
    const token =
        req.body.token ||
        req.query.token ||
        req.headers["x-access-token"];

    if (!token) {
        res.status(401).json({
            message: "Você não possui acesso"
        });
    } else {
        jwt.verify(token, global.SALT_KEY, (error, decoded) => {
            if (error) {
                res.status(401).json({
                    message: "Você não possui acesso"
                });
            } else {
                next();
            }
        });
    }
}

exports.getUserData = (req) => {
    const token =
        req.body.token ||
        req.query.token ||
        req.headers["x-access-token"];

    return this.decodeToken(token);
}