const pool = require("./db.js");

//init query 34.270ms
const getProducts = (count, page) => {
  return pool.query(`SELECT * FROM products ORDER BY id LIMIT ${count}`);
};

//init query 92.544ms
const getProductsById = (product_id) => {
  return pool.query(
    `SELECT p.id, p.name, p.slogan, p.description, p.category, p.default_price, f.feature, f.value FROM products AS p LEFT JOIN features AS f ON f."product_id" = p.id WHERE p.id=${product_id};`
  );
};

//init query 1238.337ms
const getStylesById = (product_id) => {
  return pool.query(
    `SELECT * FROM styles as s LEFT JOIN skus as sk ON sk."styleId" = s.id JOIN photos as p ON p."styleId" = s.id WHERE s."productId" =${product_id}`
  );
  //`SELECT * FROM styles WHERE styles."productId"=${product_id}`
  // SELECT * FROM styles JOIN products on styles."productId" = products.id;
  //SELECT * FROM styles as s LEFT JOIN skus as sk ON sk."styleId" = s.id JOIN photos as p ON p."styleId" = s.id WHERE s."productId" = 1;
};

//init query 143.277ms
const getRelatedById = (product_id) => {
  return pool.query(
    `SELECT * FROM related WHERE current_product_id=${product_id}`
  );
};

module.exports = {
  getProducts,
  getProductsById,
  getStylesById,
  getRelatedById,
};
