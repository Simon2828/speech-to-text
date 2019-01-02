const Api = require('./api');
const api = new Api();

const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

app.prepare()
.then(() => {
    const server = express();

    server.get('/learning-objective/:id', (req, res) => {
        const actualPage = '/lo'
        const queryParams = {learningObjective: req.params.id}
        app.render(req, res, actualPage, queryParams);
    })

    server.get('*', (req, res) => {
        return handle(req, res);
    })

    server.listen(3000, (err) => {
        if (err) throw err;
        console.log('> Ready on http://localhost:3000');
    })

    console.log('api.logData()', api.logData());
    

})
.catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
})