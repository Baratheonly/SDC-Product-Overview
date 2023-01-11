require("dotenv").config();
import express, { Application, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
// import router from './routes';
const router = require("./routes");

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/", router);

const port: number = 3000;

//loader.io stress testing
app.get(`/${process.env.LOADERIO}`, (req: Request, res: Response) => {
  res.send(process.env.LOADERIO);
});

app.listen(port, () => {
  console.log(`Express server is listening on port ${port}`);
});

module.exports = app;

// app.get("/products", (req, res) => {
//   let count = req.query.count || 5;
//   let page = req.query.page || 1;
//   queries
//     .getProducts(count, page)
//     .then((result) => res.status(200).send(result.rows))
//     .catch((err) => console.error(err));
// });

// app.get("/products/:product_id", (req, res) => {
//   queries
//     .getProductsById(req.params.product_id)
//     .then((result) => {
//       const formammatedResult = {
//         id: result.rows[0].id,
//         name: result.rows[0].name,
//         slogan: result.rows[0].slogan,
//         description: result.rows[0].description,
//         category: result.rows[0].category,
//         default_price: result.rows[0].default_price,
//         features: [],
//       };
//       result.rows.forEach((features) => {
//         const { feature, value } = features;
//         const featureEntry = {
//           feature,
//           value,
//         };
//         formammatedResult.features.push(featureEntry);
//       });
//       return formammatedResult;
//     })
//     .then((resultObj) => res.status(200).send(resultObj))
//     .catch((err) => console.error(err));
// });

// app.get("/products/:product_id/styles", (req, res) => {
//   queries
//     .getStylesById(req.params.product_id)
//     .then((result) => {
//       let formammatedResult = {
//         product_id: req.params.product_id,
//         result: result.rows[0].json_agg,
//       };
//       res.status(200).send(formammatedResult);
//     })
//     .catch((err) => console.error(err));
// });

// app.get("/products/:product_id/related", (req, res) => {
//   queries
//     .getRelatedById(req.params.product_id)
//     .then((result) => {
//       const relatedProducts = [];
//       result.rows.forEach((value) =>
//         relatedProducts.push(value.related_product_id)
//       );
//       res.status(200).send(relatedProducts);
//     })
//     .catch((err) => console.error(err));
// });
