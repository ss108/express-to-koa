import express from "express";
import bodyParser from "body-parser";

import logic from "./logic";
import expressMiddleware from "../common/middleware";

const app = express();

app.use(bodyParser.json());
app.use(expressMiddleware);

app.get('/', function (req, res) {
    res.send('Hello World');
});

app.post('/messages', function (req, res) {
    logic.create(req.body, function (err, item) {
        if (err) {
            return next(err);
        }

        res.send(`item id: ${item._id}`);
    });
});

app.get('/messages/:id', function (req, res, next) {
    logic.get(req.params.id, function (err, item) {
        if (err) {
            return next(err);
        }

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(item));
    });
});

//marks a message as read
app.put('/messages/:id', function (req, res) {
    logic.markAsRead(req.params.id, function (err) {
        if (err) {
            return next(err);
        }
    });
});

app.get('/messages', function (req, res) {
    if (!req.isAdmin) {
        return next(new Error("Unauthorized"));
    }

    logic.getAll(function (err, messages) {
        if (err) {
            return next(err);
        }

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(messages));
    });
});

app.listen(3000);
console.log("running on port 3000");