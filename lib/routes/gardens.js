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
        ])
            .then((response) => {
                const {_id, gardens} = response[1];
                res.send({_id, gardens});
            })
            .catch(next);
    })
//findbyidandupdate, pull request from user by token or gardenId user.garden.:id, update is pull this garden out of the array

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

        Garden.findByIdandUpdate( req.params.id, { $set: req.body.plot }, { new: true, runValidators: true } )
            .then(({plot}) => {
                res.send(plot);
            })
            .catch(next);
    });

module.exports = router;