const { Pool } = require("pg");
require("dotenv").config();

const postgresPool = new Pool({
  database: "products",
  host: "localhost",
  port: process.env.EXPRESSPORT,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
});

postgresPool.connect();

module.exports = postgresPool;
