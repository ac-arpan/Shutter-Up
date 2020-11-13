const mongoose  = require('mongoose')
const Schema = mongoose.Schema
const { ObjectId } = mongoose.Schema.Types

const messageSchema =  new Schema({
    sender: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    reciever: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Message = mongoose.model('Message', messageSchema)
module.exports = Message