const Router = require('express').Router;
const router = Router();
const User = require('../models/user');
const tokenService = require('../auth/token-service');
const ensureAuth = require('../auth/ensure-auth')();

function hasEmailAndPassword(req, res, next) {
    const { email, password } = req.body;
    if(!email || !password) {
        return next({
            code: 400,
            error: 'both email and password are required'
        });
    }
    next();
}

router
    .get('/verify', ensureAuth, (req, res) => {
        res.send({ valid: true });
    })

    .post('/signup', hasEmailAndPassword, (req, res, next) => {
        const { email, password } = req.body;
        delete req.body.password;
        
        User.exists({ email })
            .then(exists => {
                if(exists) {
                    throw next({
                        code: 400,
                        error: 'email in use'
                    });
                }
                const user = new User({ email });
                user.generateHash(password);
                return user.save();
            })
            .then(user => {
                return Promise.all([
                    user._id,
                    tokenService.sign(user)
                ]);
            })
            .then(([userId, token]) => res.send({ userId ,token }))
            .catch(next);
    })
    
    .post('/signin', hasEmailAndPassword, (req, res, next) => {
        const { email, password } = req.body;
        delete req.body.password;
        
        User.findOne({ email })
            // .lean()
            // .select('email, gardens')
            // .populate('gardens', '_id name')
            .then(user => {
                if(!user || !user.comparePassword(password)) {
                    throw next({
                        code: 401,
                        error: 'Invalid Login'
                    });
                }
                return user;
            })
            .then(user => {
                const {email} = user;
                return Promise.all([
                    User.findOne({email}).lean()
                        .select('email, gardens')
                        .populate('gardens', '_id name'),
                    tokenService.sign(user)
                ]);
            })
            .then(([user, token]) =>{
                res.send({ user, token });
            })
            .catch(next);
    });


module.exports = router;