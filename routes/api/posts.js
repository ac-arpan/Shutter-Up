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
router.get('/', auth, (req, res) => {
    Post.find({})
        .populate('postedBy','_id name username')
        .then(posts => res.json({ posts }))
        .catch(err => console.log(err))
})


// @route  GET /api/posts/profile
// @desc   Profile Page of User
// @access Private
router.get('/profile', auth, (req, res) => {
    Post.find({ postedBy: req.user._id })
        .select('-postedBy')
        .then(posts => res.json({ userId: req.user._id, user:req.user.name, username:req.user.username, posts }))
        .catch(err => console.log(err))
})



// @route  POST /api/posts/create
// @desc   Create New Post
// @access Private
router.post('/create', auth, (req, res) => {
    const { title, body, photo } = req.body
    if(!title || !body || !photo) {
        return res.status(400).json({ msg: "Please fill all the fields" })
    }
    const post = new Post({
        title,
        body,
        photo,
        postedBy: req.user._id
    })
    post.save()
        .then(post => res.json(post))
        .catch(err => console.log(err))
})


// @route  POST /api/posts/like/:postId
// @desc   Like a Post
// @access Private
router.put('/like/:postId', auth, (req, res) => {
    Post.findByIdAndUpdate(req.params.postId, {
        $push:{likes: req.user._id}
    },
    {
        new: true
    }
    ).exec((err, result) => {
        if(err) {
            return res.status(400).json({ msg : err })
             
        } else {
            return res.json(result)
        }
    })
})

// @route  POST /api/posts/dislike/:postId
// @desc   Like a Post
// @access Private
router.put('/dislike/:postId', auth, (req, res) => {
    Post.findByIdAndUpdate(req.params.postId, {
        $pull:{likes: req.user._id}
    },
    {
        new: true
    }
    ).exec((err, result) => {
        if(err) {
            return res.status(400).json({ msg : err })
             
        } else {
            return res.json(result)
        }
    })
})
module.exports = router