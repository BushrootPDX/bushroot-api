const Router = require('express').Router;
const router = Router();
const bodyParser = require('body-parser').json();
const Garden = require('../models/garden');

router
    .get('/', (req, res, next) => {
        Garden.find(req.query)
        .select('name width height')
        .lean()
        .then(gardens => res.send(gardens))
        .catch(next);
    })

    .get('/:id', (req, res, next) => {
        const id = req.params.id;

        Garden.findById(id)
            .lean()
            .then(garden => {
                if(!garden) throw {
                    code: 404,
                    error: `garden ${jid} does not exist`
                };
                res.send(garden);
            })
            .catch(next);
    })

    .delete('/:id', (req, res, /*, next*/) => {
        Garden.findByIdAndRemove(req.params.id)
            .then(([garden]) => res.send(garden));

            // mongoose bug, no catch for now.
            // .catch(next);
    })

    .post('/', bodyParser, (req, res, next) => {
        new Garden(req.body).save()
        .then(saved => res.send(saved))
        .catch(next);
    })

    .put('/:id', bodyParser, (req, res, next) => {
        Garden.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        .then(saved = res.send(saved))
        .catch(next);
    });

    module.exports = router;