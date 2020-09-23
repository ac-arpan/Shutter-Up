import React, { useEffect, useState, useContext } from 'react'
import { userContext } from '../context/GlobalState'
import axios from 'axios'

function SinglePost({ postId }) {

    const [post, setPost] = useState('')
    const { state } = useContext(userContext)
    // console.log(post)

    useEffect(() => {
        if(postId) {
            loadPost()
        } else {
            setPost('')
        }
    }, [postId])

    const loadPost = () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        axios.get(`/api/posts/${postId}`, config)
            .then(res => setPost(res.data.post))
            .catch(err => console.log(err))
    }

    return (
        <>
            {/* SINGLE POST MODAL */}
            <div id="modal-post" className="modal">
                <div className="modal-content singlePost">
                    {post ?
                        <div className="col s12" >
                            <div className="card z-depth-0">
                                <ul className="collection">
                                    <li className="collection-item avatar">
                                        <img src="https://images.unsplash.com/photo-1525971996320-268f0402052f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" className="circle" style={{ border: '2px solid rgb(255, 27, 65)' }} />
                                        <span className="title" style={{ fontStyle: 'italic', fontWeight: 'bold' }}>{post.postedBy.username}</span>
                                        <p>{post.postedBy.name}</p>
                                        <a href="#!" className="right"><i className="material-icons pink-text text-darken-1">bookmark_border</i></a>
                                    </li>
                                </ul>

                                <div className="card-image">
                                    <img src={post.photo} alt="" />
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
                                                    {post.comments.map(comment => (
                                                        <li key={comment._id} className="collection-item avatar">
                                                            <img src="https://images.unsplash.com/photo-1525971996320-268f0402052f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" className="circle" />
                                                            <span className="title" style={{ fontStyle: 'italic', fontWeight: 'bold' }}>{comment.postedBy.username}</span>
                                                            <p>{comment.text}</p>
                                                            {
                                                                comment.postedBy._id === state.id
                                                                    ? <p className="blue-text" style={{ fontStyle: 'italic', cursor: 'pointer' }}>delete</p>
                                                                    : null
                                                            }

                                                        </li>
                                                    ))}
                                                </ul>

                                            </div>

                                        </div>
                                        : null
                                    }

                                </div>

                            </div>

                        </div>
                        : <div className="center">
                            <div className="progress" style={{ width: '50%', margin: '10px auto' }}>
                                <div className="indeterminate"></div>
                            </div>
                        </div>
                    }

                </div>
            </div>

        </>
    )
}

export default SinglePost
