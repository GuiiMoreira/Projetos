const knex = require('../conexao')


const novaPostagem = async (req, res) => {
    const { id } = req.usuario

    const { texto, fotos } = req.body

    if (!fotos || fotos.length === 0) {
        res.status(400).json({ 'message': 'Não foi possível concluir a postagem' })
    }

    try {
        const postagem = await knex('postagens').insert({ texto, usuario_id: id }).returning('*')

        if (!postagem) {
            res.status(400).json({ 'message': 'Não foi possível concluir a postagem' })
        }

        for (const foto of fotos) {
            foto.postagem_id = postagem[0].id
        }

        const fotosCadastradas = await knex('postagem_fotos').insert(fotos)

        if (!fotosCadastradas) {
            await knex('postagens').where({ id: postagem[0].id }).del()
            res.status(400).json({ 'message': 'Não foi possível concluir a postagem' })
        }


        res.status(200).json({ 'message': 'Postagem realizada com sucesso' })

    } catch (error) {
        return res.status(400).json({ 'message': `${error.message}` })
    }

}

module.exports = { novaPostagem }