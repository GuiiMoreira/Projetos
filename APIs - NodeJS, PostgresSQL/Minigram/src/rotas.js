const express = require("express")
const usuarios = require("./controladores/usuarios")
const login = require("./controladores/login")
const postagens = require("./controladores/postagens")

const verificaLogin = require("./filtros/verificalogin")

const rotas = express()

rotas.post("/cadastro", usuarios.cadastrarUsuario)

rotas.post("/login", login.fazerLogin)

rotas.use(verificaLogin)

rotas.get('/perfil', usuarios.obterPerfil)
rotas.put('/perfil', usuarios.atualizarPerfil)

rotas.post('/postagens', postagens.novaPostagem)


module.exports = rotas