const knex = require('../../database/conection');
const bcrypt = require('bcrypt');
const registerUserSchema = require('../validations/registerUserSchema');
const editUserSchema = require('../validations/editUserSchema');

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        await registerUserSchema.validate(req.body);

        const userExist = await knex('users')
            .where({ email })
            .first();

        if (userExist) {
            return res.status(401).json("O email já esta cadastrado!");
        }
        const criptoPassword = await bcrypt.hash(password, 10);

        const user = await knex('users')
            .insert({
                name,
                email,
                password: criptoPassword,
            })
            .returning('*');

        if (!user) {
            return res.status(400).json("O usuário não foi cadastrado.");
        }

        return res.status(201).json("Usuario cadastrado com sucesso");

    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const getUser = async (req, res) => {
    const id = req.userID

    try {
        const user = await knex('users').where({ id }).first();
        if (!user) {
            return res.status(404).json('Usuario não encontrado');
        }
        
        const { password: _, ...dataUser } = user;

        return res.status(200).json(dataUser);

    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const editUser = async (req, res) => {
    let { name, email, password } = req.body;
    const id = req.userID;

    try {
        await editUserSchema.validate(req.body);

        const user = await knex('users').where({ id }).first();

        if (!user) {
            return res.status(404).json('Usuario não encontrado!');
        }

        if (password) {
            password = password.trim();
            password = await bcrypt.hash(password, 10);
        }

        if (!password) {
            password = user.password;
        }

        if (email !== user.email) {
            const checkEmail = await knex('users')
                .where({ email })
                .first();

            if (checkEmail) {
                return res.status(401).json("Email ja cadastrado");
            }
        }

        const updateUser = await knex('users')
            .where({ id })
            .update({
                name,
                email,
                password
            });

        if (!updateUser) {
            return res.status(400).json('O usuario não foi atualizado');
        }

        return res.status(200).json('Usuario foi atualizado com sucesso.');

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    registerUser,
    getUser,
    editUser
};