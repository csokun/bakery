const routers = require('express').Router();
const Command = require('./commands');
const Validator = require('./validators');

/**
 * POST /
 * Place an order
 */
routers.post('/', (req, res, next) => {
    Validator.validate(req).then(result => {
        if (!result.isEmpty()) return next();
        
        let orders = req.body.orders;
        let ordered = Command.order(orders);
        
        res.json(ordered);
    });

});

module.exports = routers;