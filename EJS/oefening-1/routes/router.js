const express = require("express");
var router = express.Router();
const productModel = require("../models/product");

router.use(function timeLog(req, res, next) {
  console.log("Time: ", new Date().toLocaleString());
  next();
});

router.get("/", (req, res) => {
  res.redirect("/products/home");
});

router.get("/products/home", async (req, res) => {
  let allProducts = await productModel.find();
  if (allProducts.length > 0) {
    return res.render("home.ejs", { products: allProducts });
  }
  return res.render("home.ejs", { products: [] });
});

router.get("/products/add", (req, res) => {
  return res.render("add.ejs");
});

router.post("/products/add", async (req, res) => {
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
    return res.status(200).redirect("/products/home");
  } else {
    return res.status(400).redirect("/products/add");
  }
});

router.get("/products/search", (req, res) => {
  return res.render("search.ejs", {
    products: [],
    notFound: false,
    err: false,
  });
});

router.post("/products/search", async (req, res) => {
  try {
    if (req.body.name.length != 0) {
      const product = await productModel.find({
        name: req.body.name,
      });
      if (product.length == 0) {
        return res.render("search.ejs", {
          products: [],
          notFound: true,
          err: false,
        });
      } else {
        return res.status(200).render("search.ejs", {
          products: product,
          notFound: false,
          err: false,
        });
      }
    } else {
      return res.render("search.ejs", {
        products: [],
        notFound: false,
        err: true,
      });
    }
  } catch (err) {
    console.error(err);
  }
});
module.exports = router;
