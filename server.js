const http = require('http');
require('dotenv').config();
const app = require('./lib/app');
const connect = require('./lib/connect');
connect('mongodb://localhost:27017/bushroot'); // convert to process.env.mongodb_uri
const server = http.createServer(app);
const port = process.env.PORT || 3001;

server.listen(port, () => {
    console.log('server is running on', server.address().port);
});
