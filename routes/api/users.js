const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const auth = require('../../middleware/auth')
const config = require('config')

const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')

// User Model
const User = require('../../models/User')
// Post Model
const Post = require('../../models/Post')

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: config.get('mailAPI')
    }
}))

// @route  POST /api/users
// @desc   Register New User
// @access Public
router.post('/', (req, res) => {

    const { name, username, email, password, photo } = req.body

    // Validation
    if (!email || !username || !name || !password) {
        return res.status(400).json({ msg: "Please enter all the field!" })
    }

    // Find if user exist with this email
    User.findOne({ email: email })
        .then(user => {
            if (user) {
                return res.status(400).json({ msg: "User already exist with this email!" })
            }
            else {
                // Hash the password and save the user
                bcrypt.hash(password, 12)
                    .then(hashedPassword => {
                        const user = new User({
                            name,
                            email,
                            username,
                            password: hashedPassword,
                            photo
                        })

                        user.save()
                            .then(user => {
                                res.json({
                                    user: { id: user._id, name: user.name, username: user.username, email: user.email }
                                })
                                transporter.sendMail({
                                    to: user.email,
                                    from: 'arpanchowdhury050@gmail.com',
                                    subject: 'SIGN-UP Success',
                                    html: '<h1>Welcome to Shutter-Up</h1>'
                                })
                                .then(() => console.log('mail-sent'))
                                .catch(err => console.log(err))
                            })
                            .catch(err => console.log(err))
                    })
                    .catch(err => console.log(err))
            }
        })
        .catch(err => console.log(err))
})


// @route  PUT /api/users/changePic
// @desc   Change Profile Pic of the User
// @access Private
router.put('/changePic', auth, (req, res) => {
    User.findByIdAndUpdate(req.user._id, {
        $set: { photo: req.body.photo }
    },
        {
            new: true
        })
        .select('-password')
        .exec((err, updatedUser) => {
            if (err) {
                return res.status(400).json({ msg: err })
            } else {
                return res.json({ updatedUser })
            }
        })
})



// @route  PUT /api/users/follow/:userId
// @desc   Follow a User
// @access Private
router.put('/follow/:userId', auth, (req, res) => {
    User.findByIdAndUpdate(req.params.userId, {
        $push: { followers: req.user._id }
    },
        {
            new: true
        }
    )
        .select('-password')
        .exec((err, followedUser) => {
            if (err) {
                return res.status(400).json({ msg: err })

            } else {
                User.findByIdAndUpdate(req.user._id, {
                    $push: { followings: req.params.userId }
                },
                    {
                        new: true
                    }
                )
                    .select('-password')
                    .exec((err, followingUser) => {
                        if (err) {
                            return res.status(400).json({ msg: err })
                        } else {
                            return res.json({ followedUser, followingUser })
                        }
                    })
            }
        })
})


// @route  PUT /api/users/unfollow/:userId
// @desc   unfollow a User
// @access Private
router.put('/unfollow/:userId', auth, (req, res) => {
    User.findByIdAndUpdate(req.params.userId, {
        $pull: { followers: req.user._id }
    },
        {
            new: true
        }
    )
        .select('-password')
        .exec((err, unFollowedUser) => {
            if (err) {
                return res.status(400).json({ msg: err })

            } else {
                User.findByIdAndUpdate(req.user._id, {
                    $pull: { followings: req.params.userId }
                },
                    {
                        new: true
                    }
                )
                    .select('-password')
                    .exec((err, unFollowingUser) => {
                        if (err) {
                            return res.status(400).json({ msg: err })
                        } else {
                            return res.json({ unFollowedUser, unFollowingUser })
                        }
                    })
            }
        })
})

// @route  GET /api/users/bookmarked
// @desc   Get the bookmarked post of the Logged in User
// @access Private
router.get('/bookmarked', auth, (req, res) => {
    Post.find({})
        .populate('postedBy', '_id name username photo')
        .populate('comments.postedBy', '_id name username photo')
        .then(posts => {
            let bookmarkedPost = []
            posts.forEach(post => {
                if (post.bookmarks.includes(req.user._id)) {
                    bookmarkedPost.push([post._id, post.photo])
                }
            })
            res.json({ bookmarkedPost })
        })
        .catch(err => console.log(err))
})


// @route  GET /api/users/search
// @desc   Search Users
// @access Private
router.get('/search', auth, (req, res) => {
    User.find({})
        .select('name photo')
        .then(users => res.json(users))
        .catch(err => console.log(err))
})



// @route  GET /api/users/:userId
// @desc   Get a single user
// @access Private
router.get('/:userId', auth, (req, res) => {
    User.findById(req.params.userId)
        .select('-password')
        .then(user => {
            Post.find({ postedBy: req.params.userId })
                .then(posts => {
                    res.json({ user: user, posts: posts })
                })
                .catch(err => {
                    console.log(err)
                })
        })
        .catch(err => {
            return res.status(400).json({ msg: err })
        })
})



module.exports = router