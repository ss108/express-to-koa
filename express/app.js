var express = require('express');
var logic = require('./logic');

var app = express();

app.get('/', function (req, res) {
    res.send('Hello World');
});

app.post('/users', function (req, res) {
    logic.create(req.body, function () {
        res.send('thumb up');
    });
});

app.listen(3000);
console.log("running on port 3000");