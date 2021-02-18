const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");

const app = express();

app.use(express.json({
    limit: "10mb"
}));

mongoose.connect(config.connectionString, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

const usersRoute = require("./routes/user-route");
app.use("/v1/users", usersRoute);

const contactsRoute = require("./routes/contact-route");
app.use("/v1/contacts", contactsRoute);

module.exports = app;