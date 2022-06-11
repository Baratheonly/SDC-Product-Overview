const pool = require("./db.js");

const getProducts = (count, page) => {
  return pool.query(`SELECT * FROM products ORDER BY id LIMIT ${count}`);
};

const getProductsById = (product_id) => {
  return pool.query(`SELECT * FROM products WHERE id=${product_id}`);
};

const getStylesById = (product_id) => {
  return pool.query(`SELECT * FROM styles WHERE id=${product_id}`);
};

const getRelatedById = (product_id) => {
  return pool.query(`SELECT * FROM related WHERE id=${product_id}`);
};

module.exports = {
  getProducts,
  getProductsById,
  getStylesById,
  getRelatedById,
};
