import React, { useState, useEffect, useContext } from 'react'
import { userContext } from '../context/GlobalState'
import axios from 'axios'
import M from 'materialize-css'
import SinglePost from './SinglePost'
import { Link } from 'react-router-dom'

function SubscribedPosts() {

    const [posts, setPosts] = useState(null)
    // console.log(posts)
    const [comment, setComment] = useState('')
    const [openedPost, setOpenedPost] = useState('')
    const { state } = useContext(userContext)



    useEffect(() => {
        let postModal = document.getElementById('modal-post')
        M.Modal.init(postModal, {
            onCloseEnd: () => setOpenedPost('')
        })
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        axios.get('/api/posts/followingPost', config)
            .then(res => setPosts(res.data.posts))
            .catch(err => console.log(err))
    }, [])

    const likeDislike = postId => e => {
        e.preventDefault()
        // the configurations
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        const postBody = JSON.stringify({})

        if (e.target.textContent.split('_').length === 2) {

            document.getElementById(`${postId}`).querySelector('.halfway-fab').classList.add('disabled')
            document.getElementById(`${postId}`).querySelector('.halfway-fab').classList.add('pulse')

            // liking a post
            e.target.textContent = e.target.textContent.split('_')[0]
            axios.put(`/api/posts/like/${postId}`, postBody, config)
                .then(res => {
                    const updatedPosts = posts.map(post => {
                        if (post._id === res.data._id) {
                            return res.data
                        } else {
                            return post
                        }
                    })

                    setPosts(updatedPosts)
                    document.getElementById(`${postId}`).querySelector('.halfway-fab').classList.remove('disabled')
                    document.getElementById(`${postId}`).querySelector('.halfway-fab').classList.remove('pulse')
                })
                .catch(err => console.log(err))
        } else {

            document.getElementById(`${postId}`).querySelector('.halfway-fab').classList.add('disabled')

            // unliking a post
            e.target.textContent = e.target.textContent + '_border'
            axios.put(`/api/posts/dislike/${postId}`, postBody, config)
                .then(res => {
                    const updatedPosts = posts.map(post => {
                        if (post._id === res.data._id) {
                            return res.data
                        } else {
                            return post
                        }
                    })

                    setPosts(updatedPosts)
                    document.getElementById(`${postId}`).querySelector('.halfway-fab').classList.remove('disabled')
                })
                .catch(err => console.log(err))
        }
    }

    const makeComment = postId => e => {
        e.preventDefault()
        e.target.comment.value = null

        // the configurations
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        const postBody = JSON.stringify({ text: comment })
        axios.put(`/api/posts/comment/${postId}`, postBody, config)
            .then(res => {
                // console.log(res.data)
                const updatedPosts = posts.map(post => {
                    if (post._id === res.data._id) {
                        return res.data
                    } else {
                        return post
                    }
                })

                setPosts(updatedPosts)
                setComment('')
                M.toast({ html: 'Comment Added!', classes: '#e91e63 pink' })
            })
            .catch(err => {
                M.toast({ html: err.response.data.msg, classes: 'e91e63 pink' })
                console.log(err)
            })
    }

    const deletePost = postId => e => {

        e.preventDefault()
        // the configurations
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        axios.delete(`/api/posts/delete/${postId}`, config)
            .then(res => {

                // console.log(res.data)
                M.toast({ html: res.data.message, classes: 'e91e63 pink' })
                const updatedPosts = posts.filter(post => post._id !== postId)
                setPosts(updatedPosts)

            })
            .catch(err => {
                M.toast({ html: err.response.data.msg, classes: 'e91e63 pink' })
                console.log(err)
            })
    }

    const bookmark = postId => e => {
        e.preventDefault()

        // the configurations
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        const postBody = JSON.stringify({})

        if (e.target.textContent.split('_').length === 2) {

            document.getElementById(`${postId}`).querySelector('#bookmark').classList.add('disabled')
            document.getElementById(`${postId}`).querySelector('#bookmark').classList.add('pulse')
            // liking a post
            e.target.textContent = e.target.textContent.split('_')[0]
            axios.put(`/api/posts/bookmark/${postId}`, postBody, config)
                .then(res => {
                    const updatedPosts = posts.map(post => {
                        console.log(res.data)
                        if (post._id === res.data._id) {
                            return res.data
                        } else {
                            return post
                        }
                    })

                    setPosts(updatedPosts)
                    document.getElementById(`${postId}`).querySelector('#bookmark').classList.remove('disabled')
                    document.getElementById(`${postId}`).querySelector('#bookmark').classList.remove('pulse')
                })
                .catch(err => console.log(err))
        } else {

            document.getElementById(`${postId}`).querySelector('#bookmark').classList.add('disabled')
            // unliking a post
            e.target.textContent = e.target.textContent + '_border'
            axios.put(`/api/posts/removeBookmark/${postId}`, postBody, config)
                .then(res => {
                    const updatedPosts = posts.map(post => {
                        if (post._id === res.data._id) {
                            return res.data
                        } else {
                            return post
                        }
                    })

                    setPosts(updatedPosts)
                    document.getElementById(`${postId}`).querySelector('#bookmark').classList.remove('disabled')
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <div className="home">
            <div className="row">

                {posts ?
                    posts.length > 0 ?
                        posts.map(post => (
                            <div key={post._id} className="col s12 l6 offset-l3" id={post._id} >
                                <div className="card">
                                    <ul className="collection">
                                        <li className="collection-item avatar">
                                            <img src={post.postedBy.photo} alt="" className="circle" style={{ border: '2px solid rgb(255, 27, 65)' }} />
                                            <Link to={state.id === post.postedBy._id ? `/profile` : `/profile/${post.postedBy._id}`}><span className="title" style={{ fontStyle: 'italic', fontWeight: 'bold', color: 'black' }}>{post.postedBy.username}</span></Link>
                                            <Link to={state.id === post.postedBy._id ? `/profile` : `/profile/${post.postedBy._id}`}><p>{post.postedBy.name}</p></Link>

                                            <a href="#!" id="bookmark" className="btn-floating pink lighten-5 right z-depth-0">
                                                <i className="material-icons pink-text text-darken-1" onClick={bookmark(post._id)}>{post.bookmarks.includes(state.id) ? "bookmark" : "bookmark_border"}</i>
                                            </a>

                                            {state.id === post.postedBy._id
                                                ? <a href="#!" className="secondary-content"><i className="material-icons red-text" onClick={deletePost(post._id)}>delete</i></a>
                                                : null
                                            }
                                        </li>
                                    </ul>

                                    <div className="card-image card-top">
                                        <img src={post.photo} alt="" />
                                        <a href="#" className="halfway-fab btn-floating white">
                                            <i className="material-icons red-text text-darken-1" onClick={likeDislike(post._id)}>{post.likes.includes(state.id) ? "favorite" : "favorite_border"}</i>
                                        </a>
                                    </div>
                                    <div className="card-content">
                                        <div className="photo-reach row">
                                            <div className="col s3 l2">
                                                <i className="material-icons red-text left">favorite</i>
                                                <span>{post.likes.length}</span>
                                            </div>
`                                   <div className="col s3 l2">
                                                <i className="material-icons green-text  left">comment</i>
                                                <span>{post.comments.length}</span>
                                            </div>
                                            <div className="col s3 l2">
                                                <i className="material-icons blue-text left">send</i>
                                                <span>13</span>
                                            </div>
                                        </div>
                                        <span className="card-title pink-text text-darken-2">{post.title}</span>
                                        <p>{post.body}</p>
                                        {post.comments.length > 0 ?
                                            <div className="comment row">
                                                <div className="col s11 offset-s1">
                                                    <ul className="collection comment-collection">
                                                        <li className="collection-item avatar">
                                                            <img src={post.comments[0].postedBy.photo} alt="" className="circle" />
                                                            <span className="title" style={{ fontStyle: 'italic', fontWeight: 'bold' }}>{post.comments[0].postedBy.username}</span>
                                                            <p>{post.comments[0].text}</p>
                                                            {
                                                                post.comments[0].postedBy._id === state.id
                                                                    ? <p className="blue-text" style={{ fontStyle: 'italic', cursor: 'pointer' }}>delete</p>
                                                                    : null
                                                            }

                                                        </li>
                                                    </ul>
                                                    <p className="modal-trigger grey-text text-darken-1" style={{ cursor: 'pointer' }} data-target="modal-post" onClick={() => setOpenedPost(post._id)}>view more...</p>
                                                </div>

                                            </div>
                                            : null
                                        }
                                        <div className="user-comment row">
                                            <div className="col s1">
                                                <img src={state.photo} alt="" className="responsive-img circle p-comment" />
                                            </div>
                                            <div className="col s10 offset-s1">
                                                <form onSubmit={makeComment(post._id)}>
                                                    <div className="input-field">
                                                        <input type="text" name="comment" placeholder="add a comment" onChange={e => setComment(e.target.value)} />
                                                    </div>
                                                </form>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                            </div>
                        ))
                        : <div className="flow-text center">No post found!</div>
                    :

                    <div className="center" style={{ margin: '100px auto' }}>
                        <div className="preloader-wrapper small active">
                            <div className="spinner-layer spinner-blue">
                                <div className="circle-clipper left">
                                    <div className="circle"></div>
                                </div><div className="gap-patch">
                                    <div className="circle"></div>
                                </div><div className="circle-clipper right">
                                    <div className="circle"></div>
                                </div>
                            </div>

                            <div className="spinner-layer spinner-red">
                                <div className="circle-clipper left">
                                    <div className="circle"></div>
                                </div><div className="gap-patch">
                                    <div className="circle"></div>
                                </div><div className="circle-clipper right">
                                    <div className="circle"></div>
                                </div>
                            </div>

                            <div className="spinner-layer spinner-yellow">
                                <div className="circle-clipper left">
                                    <div className="circle"></div>
                                </div><div className="gap-patch">
                                    <div className="circle"></div>
                                </div><div className="circle-clipper right">
                                    <div className="circle"></div>
                                </div>
                            </div>

                            <div className="spinner-layer spinner-green">
                                <div className="circle-clipper left">
                                    <div className="circle"></div>
                                </div><div className="gap-patch">
                                    <div className="circle"></div>
                                </div><div className="circle-clipper right">
                                    <div className="circle"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                }




            </div>

            {/* The Single Post Modal */}
            <SinglePost postId={openedPost} />
        </div>
    )
}

export default SubscribedPosts

