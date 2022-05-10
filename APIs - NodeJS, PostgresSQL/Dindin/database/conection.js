const knex = require('knex')({
    client: 'pg',
    connection: {
        host: process.env.HDB_HOST || "localhost",
        user: process.env.HDB_USER || "postgres",
        password: process.env.HDB_PASSWORD || "SOMOSuM2",
        database: process.env.HDB_DATABASE || "apidindin",
        port: 5432,
        // ssl: {
        //     rejectUnauthorized: false
        // }
    }
});

module.exports = knex;
