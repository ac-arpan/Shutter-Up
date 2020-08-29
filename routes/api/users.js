const express = require('express')
const router = express.Router()

const User = require('../../models/User')

router.post('/', (req, res) => {
    const user = new User(req.body)

    user.save()
        .then(user => res.json(user))
        .catch(err => console.log(err))
})

module.exports = router