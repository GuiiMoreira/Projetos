const knex = require('../conexao')
const bcrypt = require('bcrypt')

const cadastrarUsuario = async (req, res) => {
    const { username, senha } = req.body

    if (!username) {
        return res.status(404).json({ 'message': 'O campo username é obrigatório.' })
    }

    if (!senha) {
        return res.status(404).json({ 'message': 'O campo senha é obrigatório.' })
    }

    if (senha.length < 8) {
        return res.status(404).json({ 'message': 'A senha deve conter, no mínimo, 8 caracteres.' })
    }

    try {
        const quantidadeUsuarios = await knex('usuarios').where('username', username).first()

        if (quantidadeUsuarios) {
            return res.status(400).json({ 'message': 'O username informado já existe.' })
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const usuario = await knex('usuarios').insert({
            username,
            senha: senhaCriptografada
        })

        if (!usuario) {
            return res.status(400).json({ 'message': 'Não foi possível cadastrar o usuário' })
        }

        return res.status(200).json({ 'message': 'Usuário cadastrado com sucesso!' })

    }
    catch (error) {
        return res.status(400).json({ 'message': `${error.message}` })
    }
}

const obterPerfil = async (req, res) => {
    return res.status(200).json(req.usuario)
}

// const deletarUsuario = async (req, res) => {
//     const { id } = req.params;

//     try {
//         const usuario = await knex('usuarios').where({ id }).first()

//         if (!usuario) {
//             return res.status(404).json({ 'message': 'usuario não encontrado.' });
//         }

//         const query = 'delete from usuarios where id = $1';
//         const usuarioExcluido = await conexao.query(query, [id]);

//         if (usuarioExcluido.rowCount === 0) {
//             return res.status(400).json('Não foi possível excluir o usuario')
//         }

//         return res.status(200).json('O usuario foi excluido com sucesso.');
//     } catch (error) {
//         return res.status(400).json(error.message);
//     }
// }

const atualizarPerfil = async (req, res) => {
    const { id } = req.usuario;
    const { nome, email, senha, imagem, username, site, bio, telefone, genero } = req.body;
    const novasenha = []

    if (!nome && !email && !senha && !imagem && !username && !site && !bio && !telefone && !genero) {
        return res.status(404).json({ 'message': 'Preencher pelo menos um dos campos.' });
    }


    try {
        if (senha) {
            if (senha.length < 8) {
                return res.status(404).json({ 'message': 'A senha deve conter, no mínimo, 8 caracteres.' })
            }
            const teste = await bcrypt.hash(senha, 10)
            novasenha.push(teste)
        }

        if (email !== req.usuario.email) {
            const emailUsuarioExiste = await knex('usuarios').where({ email }).first()

            if (emailUsuarioExiste) {
                return res.status(404).json({ 'message': 'Email já cadastrado!' })
            }
        }

        if (username !== req.usuario.username) {
            const usernameUsuarioExiste = await knex('usuarios').where({ username }).first()

            if (usernameUsuarioExiste) {
                return res.status(404).json({ 'message': 'Username já cadastrado!' })
            }
        }

        const usuarioAtualizado = await knex('usuarios').where({ id })
            .update({ nome, email, imagem, username, site, bio, telefone, genero }, 'senha', novasenha[0]);

        if (!usuarioAtualizado) {
            return res.status(400).json({ 'message': 'Não foi possível atualizar o usuario' });
        }

        return res.status(200).json({ 'message': 'O usuario foi atualizado com sucesso' });
    } catch (error) {
        return res.status(400).json({ 'message': `${error.message}` })
    }
}

module.exports = {
    cadastrarUsuario,
    atualizarPerfil,
    obterPerfil
}
