Function.prototype.after = function (times, callback) {
    return (...args) => {
        this(...args)
        if (--times === 0) {
            callback()
        }
    }
}

function test(word) {
    console.log(word)
}
const newTest = (test.after(3, () => {
    console.log('TEST 3 TIMES')
}))
// console.log()
newTest(1)
newTest(2)
newTest(3)
newTest(4)