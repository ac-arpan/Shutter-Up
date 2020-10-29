const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('../../middleware/auth')
const crypto = require('crypto')

const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: config.get('mailAPI')
    }
}))

// User Model
const User = require('../../models/User')
const { has } = require('config')

// Our jwtSecret
const JWT_SECRET = config.get('jwtSecret')

// @route  POST /api/auth
// @desc   Authenticate the User
// @access Public
router.post('/', (req, res) => {
    const { email, password } = req.body

    // Validation
    if(!email || !password) {
        return res.status(400).json({ msg: "Please enter all the field!"})
    }
    // Find if user exist with this email
    User.findOne({ email: email })
        .then(user => {
            if(!user) {
                return res.status(400).json({ msg: "Invalid user credential"})
            }
            else {
                // compare the password and signin him/her
                bcrypt.compare(password, user.password)
                    .then(matched => {
                        if(matched) {
                            const token = jwt.sign({ _id: user.id}, JWT_SECRET)
                            res.json({
                                token: token,
                                user: { id: user._id, name: user.name, username: user.username, email: user.email, photo: user.photo }
                            })
                        }
                        else {
                            return res.status(400).json({ msg: "Invalid user credential"})
                        }
                    })
                    .catch(err => console.log(err))
            }
        })
        .catch(err => console.log(err))
})


// @route  POST /api/auth/resetPassword
// @desc   Password Reset of a User
// @access Public
router.post('/resetPassword', (req, res) => {
    crypto.randomBytes(32, (err, buffer) => {
        if(err) {
            console.log(err)
        } else {
            const token = buffer.toString('hex')
            User.findOne({ email: req.body.email })
                .then(user => {
                    if(!user) {
                        return res.status(400).json({ msg: "User don't exist"})
                    }
                    user.resetToken = token
                    user.expireToken = Date.now() + 3600000 // Token valid for 1 hour

                    user.save()
                        .then(newUser => {
                            transporter.sendMail({
                                to: user.email,
                                from: 'arpanchowdhury050@gmail.com',
                                subject: 'Password Reset Shutter-Up',
                                html: `<p>You have requested to reset your password of your shutter-up account</p>
                                        <h5>CLick on the link <a href="http://localhost:3000/resetPassword/${token}">link</a></h5>`
                            })
                            .then(() => console.log('mail-sent'))
                            .catch(err => console.log(err))

                            res.json({ msg: 'A password reset link has been sent to your registered mail id. Please reset the password within one hour.' }) 
                        })
                })
                .catch(err => console.log(err))
        }
    })
})


// @route  POST /api/auth/changePassword
// @desc   Cgange the Password  of a User
// @access Public
router.post('/changePassword', (req, res) => {
    const password = req.body.password
    const token = req.body.token

    User.findOne({ resetToken: token, expireToken: {$gt:Date.now()}})
        .then(user => {
            if(!user) {
                return res.status(400).json({ msg: "Password Reset Link Expired!Please Try again!"})
            }
            bcrypt.hash(password, 12)
                    .then(hashedPassword => {
                        user.password = hashedPassword
                        user.resetToken = undefined
                        user.expireToken = undefined

                        user.save()
                            .then(updatedUser => res.json({ msg: 'Password Changed!'}))
                            .catch(err => {
                                console.log(err)
                                // res.json({ msg: err })
                            })
                    })
                    .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
} )

// testing a protected route
router.get('/protected', auth,  (req, res) => {
    res.json({
        msg: `Welcome ${req.user.name}` })
})

module.exports = router