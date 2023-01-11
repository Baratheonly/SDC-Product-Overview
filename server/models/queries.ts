const pool = require("../db.js");

//init query 34.270ms
//deployed unopt 114ms
const getProducts = (count: number, page: number) => {
  return pool.query(`SELECT * FROM products ORDER BY id LIMIT $1 OFFSET $2`, [
    count,
    page,
  ]);
};

//init query 92.544ms
//deployed unopt 105ms
const getProductsById = (product_id: number) => {
  return pool.query(
    `SELECT p.id, p.name, p.slogan, p.description, p.category, p.default_price, f.feature, f.value FROM products AS p LEFT JOIN features AS f ON f."product_id" = p.id WHERE p.id=$1;`,
    [product_id]
  );
};

//init query 1238.337ms
//deployed unopt 89ms
//preindex deploy 371745 ms
//post index deploy 36 ms
const getStylesById = (product_id: number) => {
  return pool.query(
    `SELECT json_agg(json_build_object(
      'style_id', id,
      'name', name,
      'original_price', original_price,
      'sale_price', sale_price,
      'default_style', default_style,
      'photos', (SELECT json_agg(json_build_object(
        'thumbnail_url', thumbnail_url,
        'url', url
      ))
      FROM photos WHERE photos."styleId" = styles.id),
      'skus', (SELECT json_object_agg(id, json_build_object(
        'quantity', quantity,
        'size', size
      ))
      FROM skus WHERE skus."styleId" = styles.id)
    ))
    FROM styles WHERE styles."productId"=$1;`,
    [product_id]
  );
};

//init query 143.277ms
//deployed unopt 111ms
const getRelatedById = (product_id: number) => {
  return pool.query(
    `SELECT related_product_id FROM related WHERE current_product_id=$1`,
    [product_id]
  );
};

module.exports = {
  getProducts,
  getProductsById,
  getStylesById,
  getRelatedById,
};
