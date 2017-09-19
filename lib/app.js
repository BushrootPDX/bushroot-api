const express = require('express');
const morgan = require('morgan');
const app = express();
const jsonParser = require('body-parser').json();
const errorHandler = require('./errorHandler');

app.use(morgan('dev'));
app.use(jsonParser);
app.use(express.static('./public'));

const auth = require('./routes/auth');
const plants = require('./routes/plants');
const gardens = require('./routes/gardens');
const plantInstances = require('./routes/plantInstances');

app.use('/api/plants', plants);
app.use('/api/auth', auth);
app.use('/api/gardens', gardens);
app.use('/api/plantInstances', plantInstances);

app.use(errorHandler());
module.exports = app;