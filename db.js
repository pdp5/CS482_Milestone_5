const Pool = require("pg").Pool;
require('dotenv').config();

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'prit', 
    port: 5432
});

pool.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = pool;