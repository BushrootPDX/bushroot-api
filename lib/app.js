const express = require('express');
const morgan = require('morgan');
const app = express();
const jsonParser = require('body-parser').json();
const errorHandler = require('./errorHandler');

app.use(morgan('dev'));
app.use(jsonParser);
app.use(express.static('./public'));

app.use(errorHandler());
module.exports = app;