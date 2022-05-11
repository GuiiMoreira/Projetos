const knex = require('../../database/conection');
const registerTransactionSchema = require('../validations/registerTransactionSchema');


const registerTransaction = async (req, res) => {
    const { date, week_day, value, category, description, type } = req.body;
    const user_id = req.userID

    try {
        await registerTransactionSchema.validate(req.body);

        const cobranca = await knex('transactions')
            .insert({
                user_id,
                date,
                week_day,
                value,
                category,
                description,
                type
            })
            .returning('*');

        if (!cobranca) {
            return res.status(400).json("A transação não pôde ser cadastrada!");
        }

        return res.status(201).json('Cadastro criado com Sucesso');
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const getTransactions = async (req, res) => {
    const user_id = req.userID

    try {
        const transactions = await knex('transactions').where({ user_id });

        return res.status(200).json(transactions);

    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const editTransaction = async (req, res) => {
    const { id } = req.params;
    const user_id = req.userID
    const { date, week_day, value, category, description, type } = req.body;


    try {
        await registerTransactionSchema.validate(req.body);
        const checkTransaction = await knex('transactions').where({ id, user_id });

        if (checkTransaction.length === 0) {
            return res.status(404).json("Transação não encontrada!");
        }

        const editTransaction = await knex('transactions').where({ id, user_id }).update({ date, week_day, value, category, description, type });

        if (!editTransaction) {
            return res.status(400).json("A transação não pôde ser deletada!");
        }

        return res.status(200).json("Transação editada com sucesso!");

    } catch (error) {
        return res.status(400).json(error.message);
    }
};


const deleteTransaction = async (req, res) => {
    const { id } = req.params;
    const user_id = req.userID


    try {
        const checkTransaction = await knex('transactions').where({ id, user_id });

        if (checkTransaction.length === 0) {
            return res.status(404).json("Transação não encontrada!");
        }

        const deleteTransaction = await knex('transactions').where({ id, user_id }).del().returning('*');

        if (!deleteTransaction) {
            return res.status(400).json("A transação não pôde ser deletada!");
        }

        return res.status(200).json("Transação excluída com sucesso!");

    } catch (error) {
        return res.status(400).json(error.message);
    }
};


module.exports = {
    registerTransaction,
    getTransactions,
    deleteTransaction,
    editTransaction
}