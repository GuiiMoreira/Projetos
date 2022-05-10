const express = require('express');
const routes = express();
const users = require('./controllers/users');
const login = require('./controllers/login');
const authentication = require('./midlewares/authentication');

routes.post('/signup', users.registerUser);
routes.post('/login', login.login);
routes.use(authentication);

routes.get('/getuser', users.getUser);

module.exports = routes;
