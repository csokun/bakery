module.exports = (app) => {

    app.use('/orders', require('./orders'));

    /**
     * GET /ping
     * A simple heartbeat check
     */
    app.get('/ping', (req, res, next) => {
        res.send(`Hi mate! thanks for poking for I'm alive and kicking.`);
    });
    
    /**
     * POST /kill
     * Simulate a scenario in which the app went down
     */
    app.post('/kill', (req, res, next) => {
        res.send(`Com'on mate! Did I do you wrong?\r\nKill me! too bad I'm a walking dead.`);
        process.exit(0);
    });

};