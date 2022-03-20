const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1', err => {
    if (err) return console.log('err')
    console.log('connecting ...')
})

const userModel = require('./models/user')
userModel.create({
    username: 'zs'
}).then(res => {
    console.log(res)
})