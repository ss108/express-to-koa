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

const router = new Router()

router.post('/users', async (ctx) => {
    await logic.create(ctx.request.fields);
    ctx.body = "thumb up";
});

app.use(router.routes()).use(router.allowedMethods());

app.use(async (ctx) => {
    console.log(ctx.req.isAdmin);
    ctx.body = "Hello World";
});

app.listen(3000);
console.log("running on port 3000");