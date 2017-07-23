const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const customValidators = require('./validators').customValidators;

const app = express();

app.use(helmet({
    frameguard: { action: 'deny' }
}));
app.disable('x-powered-by');

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressValidator({
    customValidators ,
    errorFormatter: function (param, message, value) {
        var result = {
            param: param,
            message: message,
            value: value
        }

        return result;
    }
}));

//CORS middleware
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();
});

// let get started ...
require('./routes')(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    if (res.headersSent)
        return next(err);

    if (typeof req.getValidationResult == 'function') {
        req.getValidationResult().then(result => {
            if (!result.isEmpty()) {
                res.status(400);
                res.json({
                    message: 'Validation error',
                    errors: result.array()
                });
            }
        });
    } else {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            // production error handler
            // no stacktraces leaked to user
            error: (app.get('env') === 'development' || app.get('env') === 'dev') ? err : {}
        });
    }
});

module.exports = app;
