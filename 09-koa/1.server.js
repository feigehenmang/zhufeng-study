const Koa = require('./koa')
const app = new Koa()
app.use((context, next) => {
    // context.body = 4
    // console.log(context.request.url)
    // console.log(context.request.path)
    // console.log(context.path)
    console.log(1)
    next()
    context.response.body = 4 +''
    // res.end(4)
})
app.use((context, next) => {
    // context.body = 4
    console.log(2)
    next()
    console.log(3)
    // res.end(4)
})

app.listen(3000, () => {
    console.log('start up in 3000')
})