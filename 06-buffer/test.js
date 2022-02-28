const CHARTS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
function transfer(str) {
    let buf = Buffer.from(str);
    let result = '';
    for (let b of buf) {
        result += b.toString(2);
    }
    // console.log(result.match(/(\d{6})/g))
    return result.match(/(\d{6})/g).map(val => parseInt(val, 2)).map(val => CHARTS[val]).join('');
}
let r = transfer('a');
console.log(r);