module.exports = {
    port: {
        content: '-p,--port <number>',
        desc: 'port',
        default: 8080
    },
    direction: {
        content: '-d,--direction dir',
        desc: 'direction',
        default: process.cwd()
    }
}