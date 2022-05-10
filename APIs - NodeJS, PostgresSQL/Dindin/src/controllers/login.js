const knex = require('../../database/conection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const loginSchema = require('../validations/loginSchema');

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        await loginSchema.validate(req.body);

        const user = await knex('users').where({ email }).first();

        if (!user) {
            return res.status(404).json('Usuario não encontrado!');
        }

        const validatePassword = await bcrypt.compare(password, user.password);

        if (!validatePassword) {
            return res.status(400).json('password ou Email incorretos');
        }

        const token = jwt.sign({ id: user.id }, "secret", { expiresIn: '8h' });

        return res.status(200).json({ token: token });

    } catch (error) {
        return res.status(400).json(error.message);
    }
};

module.exports = {
    login
}