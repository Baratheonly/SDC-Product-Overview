const queries = require("../models/queries");

module.exports = {
  getProducts: async function (req, res) {
    let count = req.query.count || 5;
    let page = req.query.page - 1 || 0;
    try {
      let result = await queries.getProducts(count, page);
      res.status(200).send(result.rows);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getProductsById: async function (req, res) {
    const productId = req.params.product_id;
    if (isNaN(productId)) {
      res.status(400).send("Invalid Search. Please use a valid product id.");
    } else {
      try {
        let result = await queries.getProductsById(productId);
        const formammatedResult = {
          id: result.rows[0].id,
          name: result.rows[0].name,
          slogan: result.rows[0].slogan,
          description: result.rows[0].description,
          category: result.rows[0].category,
          default_price: result.rows[0].default_price,
          features: [],
        };
        result.rows.forEach((features) => {
          const { feature, value } = features;
          const featureEntry = {
            feature,
            value,
          };
          formammatedResult.features.push(featureEntry);
        });
        res.status(200).send(formammatedResult);
      } catch (err) {
        res.status(500).send(err);
      }
    }
  },
  getStylesById: async function (req, res) {
    const productId = req.params.product_id;
    if (isNaN(productId)) {
      res.status(400).send("Invalid Search. Please use a valid product id.");
    } else {
      try {
        let result = await queries.getStylesById(productId);
        let formammatedResult = {
          product_id: req.params.product_id,
          result: result.rows[0].json_agg,
        };
        res.status(200).send(formammatedResult);
      } catch (err) {
        res.status(500).send(err);
      }
    }
  },
  getRelatedById: async function (req, res) {
    const productId = req.params.product_id;
    if (isNaN(productId)) {
      res.status(400).send("Invalid Search. Please use a valid product id.");
    } else {
      try {
        let result = await queries.getRelatedById(productId);
        const relatedProducts = [];
        result.rows.forEach((value) =>
          relatedProducts.push(value.related_product_id)
        );
        res.status(200).send(relatedProducts);
      } catch (err) {
        res.status(500).send(err);
      }
    }
  },
};
