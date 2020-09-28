import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { userContext } from '../context/GlobalState'
import { useParams } from 'react-router-dom'
import M from 'materialize-css'

function UserProfile() {


    const { state } = useContext(userContext)
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
                setUserinfo(res.data.user)
                setUserPosts(res.data.posts)
            })
            .catch(err => console.log(err))
    }, [userId])


    const followUser = userId => e => {
        e.preventDefault()
        // the configurations
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        const postBody = JSON.stringify({})

            axios.put(`/api/users/follow/${userId}`, postBody, config)
                .then(res => {
                    setUserinfo(res.data.followedUser)
                })
                .catch(err => console.log(err))
        
    }

    const unFollowUser = userId => e => {
        e.preventDefault()
        // the configurations
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        const postBody = JSON.stringify({})

            axios.put(`/api/users/unfollow/${userId}`, postBody, config)
                .then(res => {
                    setUserinfo(res.data.unFollowedUser)
                })
                .catch(err => console.log(err))
        
    }

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
                                <h4>{userInfo.followers.length}</h4>
                                <p className="flow-text pink-text text-lighten-1">Follower</p>
                            </div>
                            <div className="col s4">
                                <h4>{userInfo.followings.length}</h4>
                                <p className="flow-text pink-text text-lighten-1">Following</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s4">
                                {
                                    userInfo.followers.includes(state.id) 
                                        ? 
                                        <button className="btn pink waves-effect waves-light" onClick={unFollowUser(userInfo._id)}>Unfollow</button>
                                        : 
                                        <button className="btn pink waves-effect waves-light" onClick={followUser(userInfo._id)}>Follow</button>
                                }
                            </div>
                            <div className="col s4">
                                <button className="btn pink waves-effect waves-light">Message</button>
                            </div>
                            <div className="col s4">
                                <a className="btn pink waves-effect waves-light ">Email</a>
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

