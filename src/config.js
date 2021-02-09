const { user, password, database } = { 
    user: "app",
    password: "WNXXrgWEhEIWz4Tg",
    database: "swapchat-api"
};

global.SALT_KEY = "rw^25gXKjY-Nz4&2@}^-~^xCZm+v3O*>";

module.exports = {
    connectionString: `mongodb+srv://${user}:${password}@cluster0.tyuq3.mongodb.net/${database}?retryWrites=true&w=majority`
}