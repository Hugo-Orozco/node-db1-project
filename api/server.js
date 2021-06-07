const express = require("express");
const cors = require('cors');
const accountsRouter = require('./accounts/accounts-router');

const server = express();

server.use((req, res, next) => {
    next();
});

server.use(express.json());
server.use('/api/accounts', accountsRouter);
server.use(cors());

module.exports = server;
