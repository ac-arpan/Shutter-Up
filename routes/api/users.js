const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// User Model
const User = require('../../models/User')


// @route  POST api/users
// @desc   Register New User
// @access Public
router.post('/', (req, res) => {

    const { name, email, password } = req.body

    // Validation
    if(!email || !name || !password) {
        return res.status(422).json({ error: "Please enetr all the field!"})
    }

    // Find if user exist with this email
    User.findOne({ email: email })
        .then(user => {
            if(user) {
                return res.status(422).json({ error: "User already exist with this email!"})
            }
            else {
                // Hash the password and save the user
                bcrypt.hash(password, 12)
                    .then(hashedPassword => {
                        const user = new User({
                            name,
                            email,
                            password: hashedPassword
                        })
        
                        user.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                    })
            }
        })
        .catch(err => console.log(err))
})

module.exports = router