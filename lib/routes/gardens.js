const Router = require('express').Router;
const router = Router();

router
    .get('/', (req, res, next) => {
        Garden.find(req.query)
            
    })