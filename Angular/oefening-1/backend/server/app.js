const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 3001;

const router = require("../routes/routes");

mongoose
  .connect("mongodb://localhost:27017/productsdb", { useNewUrlParser: true })
  .then(() => {
    console.log("Succesfully connected to DB! \n");

    const app = express();
    app.use(express.json());
    app.use(
      express.urlencoded({
        extended: true,
      })
    );
    app.use(cors());
    app.use("/", router);

    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    });
  });
