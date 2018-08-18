const connect = require('../../lib/connect');

let connection = null;

before ( () => {
    return connect('mongodb://localhost:27017/bushroot')
        .then(cn => connection = cn);
});

after( () => connection.close() );