const mongoose  = require('mongoose')
const Schema = mongoose.Schema
const { ObjectId } = mongoose.Schema.Types

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    followers: [
        {
            type: ObjectId,
            ref: 'User'
        }
    ],
    followings: [
        {
            type: ObjectId,
            ref: 'User'
        }
    ],
    photo: {
        type: String,
        required: true
    },
    resetToken: {
        type: String
    },
    expireToken: {
        type: Date
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User