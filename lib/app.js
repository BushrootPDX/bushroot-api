const express = require('express');
const morgan = require('morgan');
const app = express();
const jsonParser = require('body-parser').json();
const errorHandler = require('./errorHandler');
const ensureAuth = require('../auth/ensure-auth')();


app.use(morgan('dev'));
app.use(jsonParser);
app.use(express.static('./public'));

const auth = require('./routes/auth');
const gardens = require('./routes/gardens');

app.use('/api/auth', auth);
app.use('/api/gardens', ensureAuth, gardens);

app.use(errorHandler());
module.exports = app;