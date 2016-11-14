import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-better-body";
import logic from "./logic";

var app = new Koa();

app.use(bodyParser());

const router = new Router()

router.post('/users', async (ctx) => {
    await logic.create(ctx.request.fields);
    ctx.body = "thumb up";
});

app.use(router.routes()).use(router.allowedMethods());

app.use(async (ctx) => {
    ctx.body = "Hello World";
});

app.listen(3000);
console.log("running on port 3000");