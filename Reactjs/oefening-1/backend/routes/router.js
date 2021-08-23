const express = require("express");
const router = express.Router();
const productModel = require("../model/product");

router.use(function timeLog(req, res, next) {
  console.log("Time: ", new Date().toLocaleString());
  next();
});

//REDIRECT TO /PRODUCTS
router.get("/", (req, res) => {
  res.redirect("/products");
});

//GET ALL PRODUCTS
router.get("/products", async (req, res, next) => {
  const allProducts = await productModel.find();
  if (allProducts.length > 0) {
    return res.json(allProducts);
  }
  return res.send("Products db is empty!");
});

//FIND PRODUCT(S)
router.post("/products/searchAll", async (req, res, next) => {
  try {
    if (req.body.name != null) {
      const products = await productModel.find({
        name: req.body.name,
      });
      if (products.length == 0) {
        res
          .status(404)
          .send(`No product(s) found with name: ${req.body.name}!`);
      } else {
        //let products = [];
        //products.push(product);
        res.json(products);
      }
    } else {
      res.status(400).send(`Oops, something went wrong!`);
    }
  } catch (err) {
    console.error(err);
  }
});

//FIND SPECIFIC PRODUCT
router.post("/products/searchOne", async (req, res, next) => {
  try {
    if (req.body.name != null) {
      const product = await productModel.findOne({
        name: req.body.name,
      });
      if (product == null) {
        res.status(404).send(`No product found with name: ${req.body.name}!`);
      } else {
        res.json(product);
      }
    } else {
      res.status(400).send(`Oops, something went wrong!`);
    }
  } catch (err) {
    console.error(err);
  }
});

//DELETE PRODUCT
router.delete("/products/delete/:name", async (req, res) => {
  await productModel
    .deleteOne({ name: req.params.name })
    .then(() => {
      return res
        .status(200)
        .send(`Product with name ${req.params.name} succesfully deleted!`);
    })
    .catch((err) => {
      return res.status(400).send("Cannot delete object due to an error!");
    });
});

//UPDATE PRODUCT
router.post("/products/edit", async (req, res) => {
  /*let newProduct = {
    name: req.body.name,
    brand: req.body.brand,
    description: req.body.description,
    price: req.body.price,
  };*/
  await productModel.findOneAndUpdate(
    { _id: req.body._id },
    { $set: req.body },
    function (err, result) {
      if (err) {
        return res.status(400).send("Cannot update object due to an error!");
      } else {
        return res.status(200).send(
          `Product succesfully updated!`
        );
      }
    }
  );
});

//ADD PRODUCT
router.post("/products/add", async (req, res, next) => {
  const product = new productModel({
    name: req.body.name,
    brand: req.body.brand,
    description: req.body.description,
    price: req.body.price,
  });

  if (
    req.body.name != null &&
    req.body.brand != null &&
    req.body.description != null &&
    req.body.price != null
  ) {
    await product.save();
    res.status(200).send("Product succesfully created!");
  } else {
    res
      .status(400)
      .send("Product cannot be created. Please check the given form data!")
      .end();
  }
});

module.exports = router;
