const routers = require('express').Router();
const Command = require('./commands');
const Query = require('./queries');
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

/**
 * GET /products
 */
routers.get('/products', (req, res, next) => {
    Query.getItems().then(items => res.json(items)).catch(next);
});

module.exports = routers;