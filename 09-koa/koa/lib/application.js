const http = require('http')
const context = require('./context')
const request = require('./request')
const response = require('./response')
class Application {
    constructor() {
        this.context = Object.create(context)
        this.request = Object.create(request)
        this.response = Object.create(response)
        this.middlewares = []
    }
    use(middleware) {
        // this.fn = middleware
        this.middlewares.push(middleware)
    }
    runMiddleWares(context) {
        const dispatch = (index) => {
            if(index === this.middlewares.length) return Promise.resolve()
            const fn = this.middlewares[index]
            return Promise.resolve(fn(context, () => dispatch(++index)))
        }

        return dispatch(0)
    }
    handleRequest = (req, res) => {
        const context = Object.create(this.context)
        context.request = Object.create(this.request)
        context.request.req = context.req = req
        context.response = Object.create(this.response)
        context.response.res = context.res = res
        // this.fn(context)
        this.runMiddleWares(context).then(() => {
            if (context.body) {
                context.res.end(context.body)
            } else {
                context.res.end()
            }
        })


        
    }

    listen() {
        this.app = http.createServer(this.handleRequest)
        this.app.listen(...arguments)
    }
}


module.exports = Application