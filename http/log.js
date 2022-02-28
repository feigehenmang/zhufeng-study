const chalk = require('chalk')

module.exports = {
    logStart(serverSource, port, ips) {
        const str = `
${chalk.yellow('Starting up http-server, serving')} ${chalk.blue(serverSource)}
${chalk.yellow('http-server settings:')}
${chalk.yellow('Default File Extension:')} ${chalk.blue('none')}
Available on:${ips.map(ip => {
            return `\n  http://${ip}:${chalk.green(port)}`
        })}
Hit CTRL-C to stop the server`
        console.log(str)
    },
    stopedLog() {
        console.log(chalk.red('http-server stopped.'));
    }
}