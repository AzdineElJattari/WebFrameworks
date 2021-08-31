const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 4000;

const router = require("../routes/router");

const db = "testdb"; //VERANDEREN NAAR DB NAAM VOOR EXAAM en maakt zelf de DB aan

//npm i mongoose doen voor module te importeren
mongoose
  .connect(`mongodb://localhost:27017/${db}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log(`Succesfully connected to DB with name: ${db}!`);

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
