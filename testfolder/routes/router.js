var express = require("express");
var router = express.Router();
const MongoClient = require("mongodb").MongoClient;
var db;

MongoClient.connect("mongodb://localhost:27017", (err, database) => {
  if (err) return console.log(err);
  db = database.db("test");
});

router.use(function timeLog(req, res, next) {
  console.log("Time: ", new Date().toLocaleString());
  next();
});

router.get("/", (req, res) => {
  return res.redirect("/api");
});

router.get("/api", (req, res) => {
  db.collection("testcollection")
    .find()
    .toArray((err, result) => {
      if (err) return res.status(404).send("No documents found!");
      return res.json(result);
    });
});

router.get("/api/:title", (req, res) => {
  let id = parseInt(req.params.id); //ID parsen naar integer en dan gebruiken om te zoeken naar specifieke document
  db.collection("testcollection")
    .find({ title: new RegExp(req.params.title, 'i') }) //Zoeken naar documents waarvan bepaalde key in een object een value bevat.
    .toArray((err, result) => {
      if (err)
        return res
          .status(404)
          .send(`No documents found that contain: ${req.params.id}!`);
      return res.json(result);
    });
});

module.exports = router;
