const str = '[(])'

function valideStr(str) {
    const sequeue = [] // 栈 只允许push 和 pop
    const codeMaps = {
        '{':'}',
        '(':')',
        '[':']'
    }
    const arr = str.split('')
    const values = Object.values(codeMaps)
    const keys = Object.keys(codeMaps)
    for(let i = 0; i < arr.length; i++) {
        const code = arr[i]
        // } ] ) && sequeue为空
        if(sequeue.length === 0 && values.includes(code)) {
            return false
        }
        if(keys.includes(code)){
            sequeue.push(code)
        } else if(values.includes(code) || code === '*') {
            if(codeMaps[sequeue.pop()] !== code || code !== '*') {
                return false
            }
        }
    }
    return !sequeue.length
}
console.log(valideStr(str))
// sequeue