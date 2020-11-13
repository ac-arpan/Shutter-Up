const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')


// User Model
const User = require('../../models/User')

// Message Model
const Messages = require('../../models/Messages')

// @route  POST /api/messages
// @desc   Save a message in Database
// @access Private
router.post('/', auth, (req, res) => {
    const message = new Messages(req.body)

    message.save()
        .then(result => {
            res.json({ msg : "Message Saved" })
        })
        .catch(err => console.log(err))
})

// @route GET /api/messages
// @desc Get all the messages(for Developers Only)
// @access Private
router.get('/', auth, (req, res) => {
    Messages.find({})
        .populate('sender', 'name username')
        .populate('reciever', 'name username')
        .then(messages => res.json(messages))
        .catch(err => console.log(err))
})

module.exports = router