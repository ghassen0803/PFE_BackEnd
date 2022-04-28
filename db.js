const Pool = require("pg").Pool;

const pool = new Pool({
   user: "postgres",
   password: "open",
   database: "data_base",
   host: "localhost",
   port: 5432 
});
module.exports = pool;