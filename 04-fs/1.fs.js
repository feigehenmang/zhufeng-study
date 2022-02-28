const fs = require('fs')
const path = require('path')

const readFilename = path.resolve(__dirname, 'name.txt')
const sourceFilename = path.resolve(__dirname, 'copy.txt')

function copy(target, source) {
    return new Promise((resolve, reject) => {
        const destory = err => {
            reject(err)
        }
        fs.open(target, 'r', 0o600, (err, fd) => {
            if (err) return destory(err)
            // console.log(data)
            const buffer = Buffer.alloc(6)
            fs.read(fd, buffer, 0, 3, 0, (err, byteRead, data) => {
                if (err) return destory(err)
                console.log(byteRead, data)
            })
        })
    })
}

copy(readFilename, sourceFilename)

// const fs = require('fs');
// const path = require('path');
// fs.open(path.join(__dirname, 'name.txt'), 'r', 0o666, function (err, fd) {
//     console.log(err);
//     let buf = Buffer.alloc(6);
//     fs.read(fd, buf, 0, 6, 3, function (err, bytesRead, buffer) {
//         console.log(bytesRead);//6
//         console.log(buffer === buf);//true
//         console.log(buf.toString());//峰培
//     })
// })