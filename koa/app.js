import Koa from "koa";

var app = new Koa();

app.use(async (ctx) => {
    ctx.body = "Hello World";
});

app.listen(3000);
console.log("running on port 3000");