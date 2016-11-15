const express = require('express');
const bodyParser = require('body-parser');

var logic = require('./logic');
var expressMiddleware = require('../common/middleware');

var app = express();

app.use(bodyParser.json());
app.use(expressMiddleware);

app.get('/', function (req, res) {
    console.log(req.isAdmin);
    res.send('Hello World');
});

app.post('/users', function (req, res) {
    logic.create(req.body, function (err, item) {
        res.send(`item id: ${item._id}`);
    });
});

app.get('/users', function (req, res) {
    logic.getAll(function (err, users) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(users));
    });
});

app.listen(3000);
console.log("running on port 3000");