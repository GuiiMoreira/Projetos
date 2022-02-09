const knex = require('../conexao')
const bcrypt = require('bcrypt')
const senhaHash = require('../senhaHash')
const jwt = require('jsonwebtoken')

const fazerLogin = async (req, res) => {
    const { username, senha } = req.body

    if (!username || !senha) {
        return res.status(404).json({ 'message': 'username e senha são obrigatórios.' })
    }

    try {
        const usuario = await knex('usuarios').where({ username }).first()

        if (!usuario) {
            return res.status(400).json({ 'message': 'username ou senha incorretos.' })
        }

        const senhaVerificada = await bcrypt.compare(senha, usuario.senha)

        if (!senhaVerificada) {
            return res.status(400).json({ 'message': 'username ou senha incorretos.' })
        }

        const dadosTokenUsuario = {
            id: usuario.id,
            username: usuario.username
        }

        const token = jwt.sign(dadosTokenUsuario, senhaHash, { expiresIn: '1d' })
        const { senha: senhaUsuario, ...dadosUsuario } = usuario

        return res.status(200).json({
            usuario: dadosUsuario,
            token
        })

    } catch (error) {
        return res.status(400).json({ 'message': `${error.message}` })
    }
}


module.exports = { fazerLogin }