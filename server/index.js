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
    .then((result) => res.status(200).send(result.rows[0]))
    .catch((err) => console.error(err));
});

app.get("/products/:product_id/styles", (req, res) => {
  queries
    .getStylesById(req.params.product_id)
    .then((result) => res.status(200).send(result.rows[0]))
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
