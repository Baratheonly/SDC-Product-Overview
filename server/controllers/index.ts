const queries = require("../models/queries");
import { Request, Response } from "express";
import {
  product,
  feature,
  productStyles,
  relatedProduct,
} from "../models/types";

module.exports = {
  getProducts: async function (req: Request, res: Response) {
    let count = req.query.count || 5;
    let page = Number(req.query.page) - 1 || 0;
    try {
      let result = await queries.getProducts(count, page);
      res.status(200).send(result.rows);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getProductsById: async function (req: Request, res: Response) {
    const productId: number = Number(req.params.product_id);
    if (isNaN(Number(productId))) {
      res.status(400).send("Invalid Search. Please use a valid product id.");
    } else {
      try {
        let result = await queries.getProductsById(productId);
        const formammatedResult: product = {
          id: result.rows[0].id,
          name: result.rows[0].name,
          slogan: result.rows[0].slogan,
          description: result.rows[0].description,
          category: result.rows[0].category,
          default_price: result.rows[0].default_price,
          features: [],
        };
        result.rows.forEach((features: any) => {
          const { feature, value } = features;
          const featureEntry: feature = {
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
  getStylesById: async function (req: Request, res: Response) {
    const productId: number = Number(req.params.product_id);
    if (isNaN(Number(productId))) {
      res.status(400).send("Invalid Search. Please use a valid product id.");
    } else {
      try {
        let result = await queries.getStylesById(productId);
        let formammatedResult: productStyles = {
          product_id: req.params.product_id,
          result: result.rows[0].json_agg,
        };
        res.status(200).send(formammatedResult);
      } catch (err) {
        res.status(500).send(err);
      }
    }
  },
  getRelatedById: async function (req: Request, res: Response) {
    const productId: number = Number(req.params.product_id);
    if (isNaN(Number(productId))) {
      res.status(400).send("Invalid Search. Please use a valid product id.");
    } else {
      try {
        let result = await queries.getRelatedById(productId);
        const relatedProducts: number[] = [];
        result.rows.forEach((value: relatedProduct) =>
          relatedProducts.push(value.related_product_id)
        );
        res.status(200).send(relatedProducts);
      } catch (err) {
        res.status(500).send(err);
      }
    }
  },
};
