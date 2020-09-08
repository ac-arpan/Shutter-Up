const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// User Model
const User = require('../../models/User')


// @route  POST /api/users
// @desc   Register New User
// @access Public
router.post('/', (req, res) => {

    const { name, username, email, password } = req.body

    // Validation
    if(!email || !username || !name || !password) {
        return res.status(400).json({ msg: "Please enter all the field!"})
    }

    // Find if user exist with this email
    User.findOne({ email: email })
        .then(user => {
            if(user) {
                return res.status(400).json({ msg: "User already exist with this email!"})
            }
            else {
                // Hash the password and save the user
                bcrypt.hash(password, 12)
                    .then(hashedPassword => {
                        const user = new User({
                            name,
                            email,
                            username,
                            password: hashedPassword
                        })
        
                        user.save()
                            .then(user => res.json({
                                user: { id: user._id, name: user.name, username: user.username, email: user.email }
                            }))
                            .catch(err => console.log(err))
                    })
                    .catch(err => console.log(err))
            }
        })
        .catch(err => console.log(err))
})

module.exports = router