const express = require('express');
const routes = express();
const users = require('./controllers/users');
const login = require('./controllers/login');
const transactions = require('./controllers/transaction');

const authentication = require('./midlewares/authentication');

routes.post('/signup', users.registerUser);
routes.post('/login', login.login);

routes.use(authentication);

routes.get('/user', users.getUser);
routes.post('/user', users.editUser);

routes.post('/transactions', transactions.registerTransaction);
routes.get('/transactions', transactions.getTransactions);
routes.delete('/transactions/:id', transactions.deleteTransaction);
routes.put('/transactions/:id', transactions.editTransaction)





module.exports = routes;
