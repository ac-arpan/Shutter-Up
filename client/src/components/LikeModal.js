import React, { useEffect, useState, useContext } from 'react'
import { userContext } from '../context/GlobalState'
import axios from 'axios'
import { Link } from 'react-router-dom'

function LikeModal({ postId }) {

    const [post, setPost] = useState(null)
    const { state } = useContext(userContext)
    // console.log(post)

    useEffect(() => {
        if (postId) {
            loadPost()
        } else {
            setPost(null)
        }
    }, [postId])

    const loadPost = () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        axios.get(`/api/posts/postLikes/${postId}`, config)
            .then(res => setPost(res.data.post))
            .catch(err => console.log(err))
    }

    return (
        <>
            {/* LIKE MODAL */}
            <div id="modal-like" className="modal">
                <div className="modal-content">
                    {post ?
                        <>
                            <h5 className="center pink-text">{post.likes.length} Likes</h5>

                            <ul className="collection">
                                {
                                    post.likes.map(like => (
                                        <li key={like._id} className="collection-item avatar">
                                            <img src={like.photo} alt="" className="circle" />
                                            <Link to={state.id === like._id ? `/profile` : `/profile/${like._id}`}><span className="title modal-close">{like.name}</span></Link>
                                            <Link to={state.id === like._id ? `/profile` : `/profile/${like._id}`}><em><p className="black-text modal-close">{like.username}</p></em></Link>
                                            <a href="!#" className="secondary-content hide-on-med-and-down">
                                                 <i className="material-icons pink-text">favorite</i>
                                            </a>
                                        </li>
                                    )
                                )}
                            </ul>
                        </>

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

export default LikeModal
