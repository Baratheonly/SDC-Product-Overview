const pool = require("./db.js");

const getProducts = (count, page) => {
  return pool.query(`SELECT * FROM products ORDER BY id LIMIT ${count}`);
};

module.exports = getProducts;
