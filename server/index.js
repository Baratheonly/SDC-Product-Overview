const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/products", (req, res) => {
  console.log("hello products");
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

const port = process.env.EXPRESSPORT;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
