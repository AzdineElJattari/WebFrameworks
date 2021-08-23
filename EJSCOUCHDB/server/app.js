const express = require("express");
const PORT = process.env.PORT || 8000;
const router = require("../routes/router");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });

