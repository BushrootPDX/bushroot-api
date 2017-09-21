const Router = require('express').Router;
const router = Router();
const Plant = require('../models/plant');
// const PlantInstance = require('../models/plantInstance');

router

    .get('/:id', (req, res, next) => {
        Plant.findById(req.params.id)
            .lean()
            .then(plant => {
                if(!plant) throw { code: 400, error: `${req.params.id} not found`};
                else res.send(plant);
            })
            .catch(next);
    })

    .get('/', (req, res, next) => {
        Plant.find({
            'name': 
            { '$regex': `${req.query.n}`, '$options': 'gi' }
        })
            .lean()
            .then(plants => res.send(plants))
            .catch(next);
    })

    .post('/', (req, res, next) => {
        new Plant(req.body)
            .save()
            .then(plant => res.send(plant))
            .catch(next);
    })

    .put('/:id', (req, res, next) => {
        Plant.findByIdAndUpdate(req.params.id, req.body, {new: true})
            .then(plant => res.send(plant))
            .catch(next);

    })

    .delete('/:id', (req, res, next) => {
        Plant.findByIdAndRemove(req.params.id)
            .then(response => {
                res.send({removed: !!response});
            })
            .catch(next);
    });

module.exports = router;