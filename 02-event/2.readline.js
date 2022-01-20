const readline = require('readline-sync')
mainThread()
    function mainThread() {
        while (true) {
            const num1 = readline.question('num1:')
            const num2 = readline.question('num2:')
            console.log(parseFloat(num1) + parseFloat(num2))
        }    
    }