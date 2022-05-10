const knex = require('../../database/conection');
const bcrypt = require('bcrypt');
const registerUserSchema = require('../validations/registerUserSchema');
// const editaruserschema = require('../validation/editaruserschema');

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // await registerUserSchema.validate(req.body);

        const existeUsuario = await knex('users')
            .where({ email })
            .first();

        if (existeUsuario) {
            return res.status(401).json("O email já esta cadastrado!");
        }
        const criptoPassword = await bcrypt.hash(password, 10);

        const usuario = await knex('users')
            .insert({
                name,
                email,
                password: criptoPassword,
            })
            .returning('*');

        if (!usuario) {
            return res.status(400).json("O usuário não foi cadastrado.");
        }

        return res.status(201).json("Usuario cadastrado com sucesso");

    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const getUser = async (req, res) => {
    const id = req.userID
    console.log(id)

    try {
        const usuario = await knex('users').where({ id }).first();

        if (!usuario) {
            return res.status(404).json('Usuario não encontrado');
        }

        const { password: _, ...dadosUsuario } = usuario;

        return res.status(200).json(dadosUsuario);

    } catch (error) {
        return res.status(400).json(error.message);
    }
};

// const editarPerfilUsuario = async (req, res) => {
//   let { name, email, password, cpf, telefone } = req.body;
//   const id = req.usuarioId;

//   try {
//     await editaruserschema.validate(req.body);

//     const usuario = await knex('users').where({ id }).first();

//     if(!usuario) {
//       return res.status(404).json('Usuario não encontrado!');
//     }

//     if (password) {
//       password = password.trim();
//       password = await bcrypt.hash(password, 10);
//     }

//     if (!password) {
//       password = usuario.password;
//     }

//     if (email !== usuario.email) {
//       const verificarEmail = await knex('users')
//         .where({ email })
//         .first();

//       if (verificarEmail) {
//         return res.status(401).json("Email ja cadastrado");
//       }
//     }

//     if ( cpf && cpf !== usuario.cpf) {
//       const verificarCpf = await knex('users')
//         .where({ cpf })
//         .first();

//       if (verificarCpf) {
//         return res.status(401).json("Cpf ja cadastrado em outra conta");
//       }
//     }

//     const atualizarUsuario = await knex('users')
//       .where({ id })
//       .update({ 
//         name,
//         email,
//         password, 
//         cpf, 
//         telefone 
//       });

//     if (!atualizarUsuario) {
//       return res.status(400).json('O usuario não foi atualizado');
//     }

//     return res.status(200).json('Usuario foi atualizado com sucesso.');

//   } catch (error) {
//     return res.status(400).json(error.message);
//   }
// }

module.exports = {
    registerUser,
    getUser,
    // editarPerfilUsuario,
};