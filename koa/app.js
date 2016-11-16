import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-better-body";
import c2k from "koa-connect";

import logic from "./logic";
import expressMiddleware from "../common/middleware";

var app = new Koa();

app.use(bodyParser());

const convertedMiddleware = c2k(expressMiddleware);

app.use(convertedMiddleware);

app.use(async (ctx, next) => {
    try {
        await next();
    }

    catch (err) {
        ctx.status = 500;
        ctx.message = err.message || "Sorry, an error has occurred.";
    }
});

const router = new Router();

router.post('/messages', async (ctx) => {
    let item = await logic.create(ctx.request.fields);
    ctx.body = `item id: ${item._id}`;
});

router.get('/messages/:id', async (ctx) => {
    let item = await logic.get(ctx.params.id);
    ctx.body = item;
});

router.get('/messages', async (ctx) => {
    if (!ctx.req.isAdmin) {
        throw Error("Unauthorized");
    }

    let messages = await logic.getAll();
    ctx.body = messages;
});

router.put('/messages/:id', async (ctx) => {
    let res = await logic.markAsRead(ctx.params.id);
    ctx.status = 204;
    ctx.body = "";
});

app.use(router.routes()).use(router.allowedMethods());

//default, index
app.use(async (ctx) => {
    ctx.body = "Hello World";
});

app.listen(3000);
console.log("running on port 3000");