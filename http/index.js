const http = require('http')
const path = require('path')
const url = require('url')
const fs = require('fs')
const os = require('os')
const mime = require('mime')
const { stat } = require('fs').promises
const ejs = require('ejs')
class Server {
    constructor(options) {
        this.port = options.port
        this.direction = options.direction
    }
    async sendFile(pathname, request, response) {
        let type = mime.getType(pathname);   
        response.setHeader('Content-Type', type + ';charset=utf-8');
        console.log(1)
        fs.createReadStream(pathname).pipe(response)
    }

    handleRequest = async (request, response) => {
        if (request.method === 'GET' && request.url != '/favicon.ico') {
            const { pathname } = url.parse(request.url)
            const filename = path.join(process.cwd(), pathname)
            const statObj = await stat(filename)
            // console.log(statObj.isDirectory())
            if (statObj.isDirectory()) {
                fs.readdir(filename, (err, data) => {
                    console.log(err, data)
                    if (err) return
                    const dirs = data.map(dir => ({ dir, link: pathname + dir }))
                    console.log(dirs)
                    fs.readFile(path.resolve(__dirname, 'template.html'), 'utf-8', (err, data) => {
                        const str = ejs.render(data, {
                            dirs
                        })
                        console.log(str)
                        response.end(str)
                        
                    })
                })
            } else {
                this.sendFile(filename, request, response)
            }
        } else {
            response.end()
        }
    }
    start() {
        console.log('port: ', this.port)
        console.log('direction: ', this.direction)
        this.server = http.createServer(this.handleRequest)
        this.server.listen(this.port, () => {
            console.log('Listen Server up in ' + this.port)
        })
    }
}

module.exports = Server