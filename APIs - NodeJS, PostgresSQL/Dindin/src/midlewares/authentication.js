const knex = require('../../database/conection');
const jwt = require('jsonwebtoken');

const authentication = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json('Não autorizado');
    };

    try {
        const token = authorization.split(" ")[1];
        const { id } = jwt.verify(token, "secret");
        const validateUser = knex('users').where({ id }).first();

        if (!validateUser) {
            return res.status(404).json('Usuario não encontrado');
        }

        req.userID = id;

        next();
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

module.exports = authentication;