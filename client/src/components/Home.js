import React, { useState, useEffect, useContext } from 'react'
import { userContext } from '../context/GlobalState'
import axios from 'axios'
import M from 'materialize-css'

function Home() {

    const [posts, setPosts] = useState([])
    const [comment, setComment] = useState('')
    const { state } = useContext(userContext)

    console.log(posts)

    useEffect(() => {

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        axios.get('/api/posts', config)
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
                })
                .catch(err => console.log(err))
        } else {

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
                console.log(res.data)
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
        axios.delete(`/api/posts/delete/${postId}`,config)
            .then(res => {
                
                console.log(res.data)
                M.toast({ html: res.data.message, classes: 'e91e63 pink' })
                const updatedPosts = posts.filter(post => post._id !== postId)
                setPosts(updatedPosts)
    
            })
            .catch(err => {
                M.toast({ html: err.response.data.msg, classes: 'e91e63 pink' })
                console.log(err)
            })
    }

    return (
        <div className="home">
            <div className="row">

                {posts && posts.map(post => (
                    <div key={post._id} className="col s12 l6 offset-l3" >
                        <div className="card">
                            <ul className="collection">
                                <li className="collection-item avatar">
                                    <img src="https://images.unsplash.com/photo-1525971996320-268f0402052f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" className="circle" style={{ border: '2px solid rgb(255, 27, 65)' }} />
                                    <span className="title" style={{ fontStyle: 'italic', fontWeight: 'bold' }}>{post.postedBy.username}</span>
                                    <p>{post.postedBy.name}</p>
                                    <a href="#!" className="right"><i className="material-icons pink-text text-darken-1">bookmark_border</i></a>
                                    {state.id === post.postedBy._id 
                                        ?<a href="#!" className="secondary-content"><i className="material-icons red-text" onClick={deletePost(post._id)}>delete</i></a>
                                        : null
                                    }
                                </li>
                            </ul>

                            <div className="card-image">
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
                                { post.comments.length > 0 ? 
                                        <div className="comment row">
                                        <div className="col s11 offset-s1">
                                            <ul className="collection comment-collection">
                                                <li className="collection-item avatar">
                                                    <img src="https://images.unsplash.com/photo-1525971996320-268f0402052f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" className="circle" />
                                                    <span className="title" style={{ fontStyle: 'italic', fontWeight: 'bold' }}>{post.comments[0].postedBy.username}</span>
                                                    <p>{post.comments[0].text}</p>
                                                </li>
                                            </ul>
                                            <p className="grey-text text-darken-1">view more...</p>
                                        </div>
    
                                    </div> 
                                    : null
                                }
                                <div className="user-comment row">
                                    <div className="col s1">
                                        <img src="https://images.unsplash.com/photo-1525971996320-268f0402052f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" className="responsive-img circle" />
                                    </div>
                                    <div className="col s10 offset-s1">
                                        <form onSubmit={makeComment(post._id)}>
                                            <div className="input-field">
                                                <input type="text" name="comment" placeholder="add a comment"  onChange={e => setComment(e.target.value)} />
                                            </div>
                                        </form>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>
                ))}




            </div>
        </div>
    )
}

export default Home

