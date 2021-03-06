const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  database: "products",
  host: "localhost",
  port: process.env.EXPRESSPORT,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
});

pool.connect();

module.exports = pool;
