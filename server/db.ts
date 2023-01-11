const { Pool } = require("pg");
require("dotenv").config();

const postgresPool = new Pool({
  database: "products",
  host: "localhost",
  port: process.env.EXPRESSPORT,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
});

postgresPool.on("error", (err: any) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

try {
  postgresPool.connect();
} catch (err) {
  console.error(err);
}

module.exports = postgresPool;
