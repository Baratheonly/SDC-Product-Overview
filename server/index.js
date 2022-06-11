const express = require("express");
require("dotenv").config();
const queries = require("./queries.js");

const app = express();

app.use(express.json());

app.get("/products", (req, res) => {
  let count = req.query.count || 5;
  let page = req.query.page || 1;
  queries(count, page)
    .then((result) => res.status(200).send(result.rows))
    .catch((err) => console.error(err));
});

app.get("/products/:id", (req, res) => {
  console.log("hello products id");
});

app.get("/products/:id/styles", (req, res) => {
  console.log("hello product id styles");
});

app.get("/products/:id/related", (req, res) => {
  console.log("hello products id related");
});

const port = 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
