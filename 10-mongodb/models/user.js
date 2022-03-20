const mogoose = require('mongoose')
const UserSchem = mogoose.Schema({
    username: {
        type: String
    }
})

module.exports = mogoose.model('User', UserSchem,'user')