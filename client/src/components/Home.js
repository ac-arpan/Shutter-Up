import Axios from 'axios'
import React, { useState, useEffect } from 'react'

function Home() {

    const [posts, setPosts] = useState([])


    useEffect(() => {

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        Axios.get('/api/posts', config)
            .then(res => setPosts(res.data.posts))
            .catch(err => console.log(err))
    }, [])

    const handleIconClick = e => {
        e.preventDefault()
        if (e.target.textContent.split('_').length === 2) {
            e.target.textContent = e.target.textContent.split('_')[0]
        } else {
            e.target.textContent = e.target.textContent + '_border'
        }
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
                                    <a href="#!" className="secondary-content"><i className="material-icons pink-text text-darken-1" onClick={handleIconClick} >bookmark_border</i></a>
                                </li>
                            </ul>

                            <div className="card-image">
                                <img src={post.photo} alt="" />
                                <a href="#" className="halfway-fab btn-floating white">
                                    <i className="material-icons red-text text-darken-1" onClick={handleIconClick}>favorite_border</i>
                                </a>
                            </div>
                            <div className="card-content">
                                <div className="photo-reach row">
                                    <div className="col s3 l2">
                                        <i className="material-icons red-text left">favorite</i>
                                        <span>50</span>
                                    </div>
`                                   <div className="col s3 l2">
                                        <i className="material-icons green-text  left">comment</i>
                                        <span>20</span>
                                    </div>
                                    <div className="col s3 l2">
                                        <i className="material-icons blue-text left">send</i>
                                        <span>13</span>
                                    </div>
                                </div>
                                <span className="card-title pink-text text-darken-2">{post.title}</span>
                                <p>{post.body}</p>
                                <div className="comment row">
                                    <div className="col s11 offset-s1">
                                        <ul className="collection comment-collection">
                                            <li className="collection-item avatar">
                                                <img src="https://images.unsplash.com/photo-1525971996320-268f0402052f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" className="circle" />
                                                <span className="title" style={{ fontStyle: 'italic', fontWeight: 'bold' }}>ac_chowdhury</span>
                                                <p>Nice Landscape!</p>
                                            </li>
                                        </ul>
                                        <p className="grey-text text-darken-1">view more...</p>
                                    </div>

                                </div>
                                <div className="user-comment row">
                                    <div className="col s1">
                                        <img src="https://images.unsplash.com/photo-1525971996320-268f0402052f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" className="responsive-img circle" />
                                    </div>
                                    <div className="col s10 offset-s1">
                                        <div className="input-field">
                                            <input type="text" placeholder="add a comment" />
                                        </div>
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

