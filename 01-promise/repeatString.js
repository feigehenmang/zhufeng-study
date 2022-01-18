const str = 'yessey'
function isRepeatString(str) {
    return str === str.split('').reverse().join('')
}
function isRepeatStringTwo(str) {
    const len = str.length / 2
    for (let index = 0; index < len; index++) {
        if (str[index] !== str[str.length - 1 - index]) {
            return false
        }
    }
    return true
}
// console.log(isRepeatString(str))
console.log(isRepeatStringTwo(str))