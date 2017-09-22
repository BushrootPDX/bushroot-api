const Router = require('express').Router;
const router = Router();
const Garden = require('../models/garden');
const User = require('../models/user');

router
    .get('/', (req, res, next) => {
        Garden.find(req.query)
            .select('name width length')
            .lean()
            .then(gardens => res.send(gardens))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        const id = req.params.id;

        Garden.findById(id)
            .lean()
            .select('_id name plot width length')
            .populate({ path: 'plot.plantId', select: '_id name spread' })
            .then(garden => {
                if(!garden) throw {
                    code: 404,
                    error: `garden ${id} does not exist`
                };
                res.send(garden);
            })
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        Promise.all([
            Garden.findByIdAndRemove(req.params.id),
            User.findByIdAndUpdate(req.user.id, {$pull: {gardens: req.params.id}}, {new: true})
                .select('_id, gardens')
                .populate('gardens', '_id name')
        ])
            .then(([response, revisedUser]) => res.send({response, revisedUser}))
            .catch(next);

        // mongoose bug, no catch for now.
        // .catch(next);
    })

    .post('/', (req, res, next) => {
        new Garden(req.body).save()
            .then(saved => {
                return Promise.all([
                    saved,
                    User.findByIdAndUpdate(req.user.id, {$addToSet: {gardens: saved._id}}, {new: true})
                ]);
            })
            .then(([savedGarden, updatedUser]) => {
                return Promise.all([savedGarden,
                    User.findOne(updatedUser._id).lean()
                        .select('_id, gardens')
                        .populate('gardens', '_id name')
                ]);
            })
            .then(([savedGarden, updatedUser]) => {
                const slimUser = updatedUser;
                console.log(savedGarden);
                res.send({savedGarden, slimUser});
            })
            .catch(next);
    })

    
    .put('/:id/plot', (req, res, next) => {
        Garden.findByIdAndUpdate( 
            req.params.id,
            { $set: { plot: req.body } }, 
            { new: true, runValidators: true } )
            .select('_id name plot width length')
            .populate({ path: 'plot.plantId', select: '_id name spread' })
            .then( newGarden => res.send(newGarden))
            .catch(next);
    })

    .put('/:id', (req, res, next) => {
        Garden.findByIdAndUpdate( 
            req.params.id,
            { $set: req.body }, 
            { new: true, runValidators: true } )
            .select('_id name plot width length')
            .populate({ path: 'plot.plantId', select: '_id name spread' })
            .then( newGarden => res.send(newGarden))
            .catch(next);
    });

module.exports = router;