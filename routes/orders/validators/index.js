/**
 * Order Custom Validator
 * to learn more tricks visit https://github.com/chriso/validator.js
 */
module.exports.validate = (req) => {
    req.checkBody('orders'
        , 'Order list not found, please retry e.g { orders:[ { code: string, qty: number } ] }'
    ).isArray();

    req.checkBody('orders'
        , `Each order must have a code (string) e.g. { code: 'VS5', qty: 3 }`
    ).eachNotEmpty('code');

    req.checkBody('orders'
        , `Each order must have a qty (number) e.g. { code: 'VS5', qty: 3 }`
    ).eachIsInt('qty');

    return req.getValidationResult();
};