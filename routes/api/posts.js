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
        .sort({ createdAt: -1 })
        .populate('postedBy','_id name username photo')
        .populate('comments.postedBy','_id name username photo')
        .then(posts => res.json({ posts }))
        .catch(err => console.log(err))
})

// @route  GET /api/posts/followingPost
// @desc   Get all the Posts of User whom I follow
// @access Private
router.get('/followingPost', auth, (req, res) => {
    Post.find({ postedBy : { $in: req.user.followings }})
        .sort({ createdAt: -1 })
        .populate('postedBy','_id name username photo')
        .populate('comments.postedBy','_id name username photo')
        .then(posts => res.json({ posts }))
        .catch(err => console.log(err))
})

// @route  GET /api/posts/userPostList/:userId
// @desc   Get all the Posts of a User in a list format
// @access Private
router.get('/userPostList/:userId', auth, (req, res) => {
    Post.find({ postedBy : req.params.userId })
        .populate('postedBy','_id name username photo')
        .populate('comments.postedBy','_id name username photo')
        .then(posts => res.json({ posts }))
        .catch(err => console.log(err))
})


// @route  GET /api/posts/profile
// @desc   Profile Page of User
// @access Private
router.get('/profile', auth, (req, res) => {
    Post.find({ postedBy: req.user._id })
        .select('-postedBy')
        .then(posts => res.json({ _id: req.user._id, name:req.user.name, username:req.user.username, followers:req.user.followers, followings:req.user.followings, photo:req.user.photo, posts }))
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


// @route  PUT /api/posts/like/:postId
// @desc   Like a Post
// @access Private
router.put('/like/:postId', auth, (req, res) => {
    Post.findByIdAndUpdate(req.params.postId, {
        $push:{likes: req.user._id}
    },
    {
        new: true
    }
    )
    .populate('postedBy','_id name username photo')
    .populate('comments.postedBy','_id name username photo')
    .exec((err, result) => {
        if(err) {
            return res.status(400).json({ msg : err })
             
        } else {
            return res.json(result)
        }
    })
})

// @route  PUT /api/posts/dislike/:postId
// @desc   Unlike a Post
// @access Private
router.put('/dislike/:postId', auth, (req, res) => {
    Post.findByIdAndUpdate(req.params.postId, {
        $pull:{likes: req.user._id}
    },
    {
        new: true
    }
    )
    .populate('postedBy','_id name username photo')
    .populate('comments.postedBy','_id name username photo')
    .exec((err, result) => {
        if(err) {
            return res.status(400).json({ msg : err })
             
        } else {
            return res.json(result)
        }
    })
})

// @route  PUT /api/posts/bookmark/:postId
// @desc   Bookmark the Post
// @access Private
router.put('/bookmark/:postId', auth, (req, res) => {
    Post.findByIdAndUpdate(req.params.postId, {
        $push:{bookmarks: req.user._id}
    },
    {
        new: true
    }
    )
    .populate('postedBy','_id name username photo')
    .populate('comments.postedBy','_id name username photo')
    .exec((err, post) => {
        if(err) {
            return res.status(400).json({ msg : err })
             
        } else {
            return res.json(post)
        }
    })
})

// @route  PUT /api/posts/removeBookmark/:postId
// @desc   Remove Bookmark from a Post
// @access Private
router.put('/removeBookmark/:postId', auth, (req, res) => {
    Post.findByIdAndUpdate(req.params.postId, {
        $pull:{bookmarks: req.user._id}
    },
    {
        new: true
    }
    )
    .populate('postedBy','_id name username photo')
    .populate('comments.postedBy','_id name username photo')
    .exec((err, post) => {
        if(err) {
            return res.status(400).json({ msg : err })
             
        } else {
            return res.json(post)
        }
    })
})

// @route  PUT /api/posts/comment/:postId
// @desc   Comment on a Post
// @access Private
router.put('/comment/:postId', auth, (req, res) => {

    const comment = {
        text: req.body.text,
        postedBy: req.user._id
    }

    Post.findByIdAndUpdate(req.params.postId, {
        $push:{comments: comment}
    },
    {
        new: true
    }
    )
    .populate('postedBy','_id name username photo')
    .populate('comments.postedBy','_id name username photo')
    .exec((err, result) => {
        if(err) {
            return res.status(400).json({ msg : err })
             
        } else {
            return res.json(result)
        }
    })
})

// @route  DELETE /api/posts/delete/:postId
// @desc   Deleting  a Post
// @access Private
router.delete('/delete/:postId', auth, (req, res) => {

    Post.findOne({ _id: req.params.postId })
        .populate('postedBy', '_id')
        .exec((err, post) => {
            if(err || !post) {
                return res.status(400).json({ msg : err })
            } else {
                if(post.postedBy._id.toString() === req.user._id.toString()) {
                    post.remove()
                        .then(result => {
                            res.json({ message: 'Successfully Deleted!' })
                        })
                        .catch(err => console.log(err))
                } else {
                    return res.status(400).json({ msg : "Not authorized!" })
                }

            }
        })
})


// @route  GET /api/posts/postLikes/:postId
// @desc   Get a single Posts Likes
// @access Private
router.get('/postLikes/:postId', auth, (req, res) => {
    Post.findById(req.params.postId)
        .populate('likes','_id name username photo')
        .then(post => res.json({ post }))
        .catch(err => console.log(err))
})

// @route  GET /api/posts/:postId
// @desc   Get a single Posts
// @access Private
router.get('/:postId', auth, (req, res) => {
    Post.findById(req.params.postId)
        .populate('postedBy','_id name username photo')
        .populate('comments.postedBy','_id name username photo')
        .then(post => res.json({ post }))
        .catch(err => console.log(err))
})

module.exports = router