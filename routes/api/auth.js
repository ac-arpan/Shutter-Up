const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('../../middleware/auth')

// User Model
const User = require('../../models/User')

// Our jwtSecret
const JWT_SECRET = config.get('jwtSecret')

// @route  POST /api/auth
// @desc   Authenticate the User
// @access Public
router.post('/', (req, res) => {
    const { email, password } = req.body

    // Validation
    if(!email || !password) {
        return res.status(422).json({ error: "Please enetr all the field!"})
    }
    // Find if user exist with this email
    User.findOne({ email: email })
        .then(user => {
            if(!user) {
                return res.status(422).json({ error: "Invalid user credential"})
            }
            else {
                // compare the password and signin him/her
                bcrypt.compare(password, user.password)
                    .then(matched => {
                        if(matched) {
                            const token = jwt.sign({ _id: user.id}, JWT_SECRET)
                            res.json({
                                token: token,
                                user: { id: user._id, name: user.name, email: user.email }
                            })
                        }
                        else {
                            return res.status(422).json({ error: "Invalid user credential"})
                        }
                    })
                    .catch(err => console.log(err))
            }
        })
        .catch(err => console.log(err))
})

// testing a protected route
router.get('/protected', auth,  (req, res) => {
    res.json({
        msg: `Welcome ${req.user.name}` })
})

module.exports = router