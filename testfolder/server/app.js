const express = require("express");
const PORT = process.env.PORT || 8000;
const router = require("../routes/router");

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });

