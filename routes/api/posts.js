const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const auth = require('../../middleware/auth')

// Models
const Post = require('../../models/Post')
const User = require('../../models/User')


// @route  GET /api/posts
// @desc   Get all the Posts
// @access Private
router.get('/', (req, res) => {
    Post.find({})
        .populate('postedBy','_id name')
        .then(posts => res.json({ posts }))
        .catch(err => console.log(err))
})

// @route  POST /api/posts/create
// @desc   Create New Post
// @access Private
router.post('/create', auth, (req, res) => {
    const { title, body } = req.body
    if(!title || !body) {
        return res.status(422).json({ err: "Please fill all the fields" })
    }
    const post = new Post({
        title,
        body,
        postedBy: req.user._id
    })
    post.save()
        .then(post => res.json(post))
        .catch(err => console.log(err))
})
module.exports = router