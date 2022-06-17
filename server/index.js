const express = require("express");
require("dotenv").config();
const queries = require("./queries.js");
var morgan = require("morgan");
var cors = require("cors");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

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
      let formammatedResult = {
        product_id: req.params.product_id,
        result: result.rows[0].json_agg,
      };
      res.status(200).send(formammatedResult);
    })
    .catch((err) => console.error(err));
});

app.get("/products/:product_id/related", (req, res) => {
  queries
    .getRelatedById(req.params.product_id)
    .then((result) => {
      const relatedProducts = [];
      result.rows.forEach((value) =>
        relatedProducts.push(value.related_product_id)
      );
      res.status(200).send(relatedProducts);
    })
    .catch((err) => console.error(err));
});

const port = 3000;

app.get(`/loaderio-1717f1fd12ec568c8793b0b3896457d0`, (req, res) => {
  res.send(`loaderio-1717f1fd12ec568c8793b0b3896457d0`);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

module.exports = app;

// SELECT json_agg(json_build_object(
//   'style_id', id,
//   'name', name,
//   'original_price', original_price,
//   'sale_price', sale_price,
//   'default_style', default_style,
//   'photos', (SELECT json_agg(json_build_object(
//     'thumbnail_url', thumbnail_url,
//     'url', url
//     )) FROM photos WHERE styleid=id)
//   )) FROM styles WHERE productid=1

// SELECT json_agg(json_build_object('style_id', id, 'name', name, 'original_price', original_price, 'sale_price', sale_price, 'default_style', default_style, 'photos', (SELECT json_agg(json_build_object('thumbnail_url', thumbnail_url, 'url', url)) FROM photos WHERE styleId=1), 'skus', (SELECT json_agg(json_build_object('quantity', quantity, 'size', size)) FROM skus WHERE styleId = 1))) FROM styles WHERE productId=1;
