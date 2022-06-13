const express = require("express");
require("dotenv").config();
const queries = require("./queries.js");

const app = express();

app.use(express.json());

app.get("/products", (req, res) => {
  let count = req.query.count || 5;
  let page = req.query.page || 1;
  queries
    .getProducts(count, page)
    .then((result) => res.status(200).send(result.rows))
    .catch((err) => console.error(err));
});

app.get("/products/:product_id", (req, res) => {
  queries
    .getProductsById(req.params.product_id)
    .then((result) => {
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
      return formammatedResult;
    })
    .then((resultObj) => res.status(200).send(resultObj))
    .catch((err) => console.error(err));
});

app.get("/products/:product_id/styles", (req, res) => {
  queries
    .getStylesById(req.params.product_id)
    .then((result) => {
      console.log(result.rows, "here");
      const results = [];
      result.rows.forEach((style) => {
        const styleEntry = {
          style_id: style.id,
          name: style.name,
          original_price: style.original_price,
          sale_price: style.sale_price,
          "default?": style.default_style,
          photos: [],
          skus: {},
        };
        results.push(styleEntry);
      });
      const formammatedResult = {
        product_id: req.params.product_id,
        results: results,
      };
      res.status(200).send(formammatedResult);
    })
    .catch((err) => console.error(err));
});

app.get("/products/:product_id/related", (req, res) => {
  queries
    .getRelatedById(req.params.product_id)
    .then((result) => res.status(200).send(result.rows[0]))
    .catch((err) => console.error(err));
});

const port = 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
