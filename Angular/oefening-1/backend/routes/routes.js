const express = require("express");
//const mongoose = require("mongoose");
const router = express.Router();
const productModel = require("../model/product");

router.use(function timeLog(req, res, next) {
  console.log("Time: ", new Date().toLocaleString());
  next();
});

//GET ALL PRODUCTS
router.get("/api", async (req, res, next) => {
  const allProducts = await productModel.find();
  if (allProducts.length > 0) {
    res.json(allProducts).end();
  }
  res.send("Products db is empty!").end();
});

//FIND SPECIFIC PRODUCT
router.post("/api/search", async (req, res, next) => {
  try {
    if (req.body.name != null) {
      const product = await productModel.findOne({
        name: req.body.name,
      })
      if (product == null) {
        res.status(400).send(`No product found with name: ${req.body.name}!`);
      } else {
        let products = [];
        products.push(product);
        res.json(products);
      }
    } else {
      res.status(400).send(`Oops, something went wrong!`);
    }
  } catch (err) {
    console.error(err);
  }
});

//CREATE PRODUCT
router.post("/api/createproduct", async (req, res, next) => {
  const product = new productModel({
    name: req.body.name,
    price: req.body.price,
    rating: req.body.rating,
  });
  if (
    req.body.name != null &&
    req.body.price != null &&
    req.body.rating != null
  ) {
    await product.save();
    res.status(200).send("Product succesfully created!").end();
  } else {
    res
      .status(400)
      .send("Product cannot be created. Please check the given form data!")
      .end();
  }
});

module.exports = router;
