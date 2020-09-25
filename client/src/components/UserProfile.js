import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function UserProfile() {


    const [userInfo, setUserinfo] = useState(null)
    const [userPosts, setUserPosts] = useState(null)
    const { userId } = useParams()


    useEffect(() => {

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        axios.get(`/api/users/${userId}`, config)
            .then(res => {
                console.log(res.data)
                setUserinfo(res.data.user)
                setUserPosts(res.data.posts)
            })
            .catch(err => console.log(err))
    }, [userId])

    return (
        <div className="container profile-page">
            { userInfo && userPosts ?
                <div className="row profile">
                    <div className="col s12 l3 profile-img">
                        <img src="https://images.unsplash.com/photo-1525971996320-268f0402052f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" className="responsive-img materialboxed circle" />
                    </div>
                    <div className="col s12 l6 offset-l2 profile-desc">
                        <blockquote>
                            <h4>{userInfo.name.split(' ')[0]} <span className="pink-text">{userInfo.name.split(' ')[1]}</span></h4>
                        </blockquote>
                        <h5>{userInfo.username}</h5>
                        <div className="row">
                            <div className="col s4">
                                <h4>{userPosts.length}</h4>
                                <p className="flow-text pink-text text-lighten-1">Posts</p>
                            </div>
                            <div className="col s4">
                                <h4>7000</h4>
                                <p className="flow-text pink-text text-lighten-1">Follower</p>
                            </div>
                            <div className="col s4">
                                <h4>212</h4>
                                <p className="flow-text pink-text text-lighten-1">Following</p>
                            </div>
                        </div>
                    </div>
                </div>
                : null}
            <div className="edit">
                <p className="flow-text center">Edit Profile</p>
            </div>
            <div className="gallery">
                <div className="row">
                    {userPosts &&
                        userPosts.map(post => (
                            <div key={post._id} className="col s4 l4">
                                <img src={post.photo} alt={post.title} className="profile-posts responsive-img"  />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default UserProfile

