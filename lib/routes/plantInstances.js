const Router = require('express').Router;
const router = Router();
const bodyParser = require('body-parser').json();
const PlantInstance = require('../models/plantInstance');

router
    .get('/', (req, res, next) => {
        PlantInstance.find(req.query)
            .select('species x y')
            .lean()
            .then(plantInstances => res.send(plantInstances))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        const id = req.params.id;

        PlantInstance.findById(id)
            .lean()
            .then(plantInstance => {
                if(!plantInstance) throw {
                    code: 404,
                    error: `plant instance ${id} does not exist`
                };
                res.send(plantInstance);
            })
            .catch(next);
    })

    .delete('/:id', (req,res, /*, next*/) => {
        PlantInstance.findByIdAndRemove(req.params.id)
            .then(([plantInstance]) => res.send(plantInstance));

            // mongoose bug, no catch for now.
            // .catch(next);
    })

    .post('/', bodyParser, (req, res, next) => {
        new PlantInstance(req.body).save()
        .then(saved => res.send(saved))
        .catch(next);
    })

    .put('/:id', bodyParser, (req, res, next) => {
        PlantInstance.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
    })
        .then(saved = res.send(saved))
        .catch(next);
});

module.exports = router;