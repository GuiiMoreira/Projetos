const knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: 'SOMOSuM2',
    database: 'market_cubos'
  }
});


module.exports = knex


