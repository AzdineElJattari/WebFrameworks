const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/router");
const PORT = process.env.PORT || 3001;
var path = require("path");

mongoose
  .connect("mongodb://localhost:27017/productsdb", { useNewUrlParser: true })
  .then(() => {
    console.log("Succesfully connected to DB! \n");

    const app = express();
    app.set("views", path.join(__dirname, "views")); // HEEL BELANGRIJK ZODAT Express App de .ejs files terug vindt in de routes!
    app.set("view engine", "ejs");
    app.use(express.json());
    app.use(
      express.urlencoded({
        extended: true,
      })
    );
    app.use("/", router);
    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    });
  });
