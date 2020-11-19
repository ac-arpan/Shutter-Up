import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { userContext } from '../context/GlobalState'
import { useParams, Link } from 'react-router-dom'
import M from 'materialize-css'
import FollowerModal from './FollowerModal'
import FollowingModal from './FollowingModal'

function UserProfile() {


    const { state } = useContext(userContext)
    const [userInfo, setUserinfo] = useState(null)
    const [userPosts, setUserPosts] = useState(null)
    const { userId } = useParams()



    useEffect(() => {

        let tabs = document.querySelectorAll('.tabs')
        M.Tabs.init(tabs)

        let connectionModal = document.getElementById('modal-connection')
        let connectionModal2 = document.getElementById('modal-connection2')
        M.Modal.init(connectionModal)
        M.Modal.init(connectionModal2)


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

        document.querySelector('#follow-btn').classList.add('disabled')
        document.querySelector('#follow-btn').classList.add('pulse')
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
                // document.querySelector('#follow-btn').classList.remove('disabled')
                // document.querySelector('#follow-btn').classList.remove('pulse')
            })
            .catch(err => console.log(err))

    }

    const unFollowUser = userId => e => {
        e.preventDefault()
        document.querySelector('#unFollow-btn').classList.add('disabled')
        document.querySelector('#unFollow-btn').classList.add('pulse')
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
                // document.querySelector('#unFollow-btn').classList.remove('disabled')
                // document.querySelector('#unFollow-btn').classList.remove('pulse')
            })
            .catch(err => console.log(err))

    }


    return (
        <>
        <div className="container profile-page">
            { userInfo && userPosts ?
                <div className="row profile">
                    <div className="col s12 l3 profile-img">
                        <img src={userInfo.photo} alt="" className="responsive-img circle p-img" />
                    </div>
                    <div className="col s12 l6 offset-l2 profile-desc">
                        <blockquote>
                            <h4>{userInfo.name.split(' ')[0]} <span className="pink-text">{userInfo.name.split(' ')[1]}</span></h4>
                        </blockquote>
                        <h5>{userInfo.username}</h5>
                        <div className="row">
                            <Link to={`/userPostList/${userInfo._id}`}><div className="col s4">
                                <h4 style={{ color: 'black' }}>{userPosts.length}</h4>
                                <p className="flow-text pink-text text-lighten-1">Posts</p>
                            </div></Link>
                            <div className={userInfo.followers.length > 0 ? "modal-trigger col s4" : "col s4"} data-target="modal-connection">
                                <h4>{userInfo.followers.length}</h4>
                                <p className="flow-text pink-text text-lighten-1">Follower</p>
                            </div>
                            <div className={userInfo.followings.length > 0 ? "modal-trigger col s4" : "col s4"} data-target="modal-connection2">
                                <h4>{userInfo.followings.length}</h4>
                                <p className="flow-text pink-text text-lighten-1">Following</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s4">
                                {
                                    userInfo.followers.includes(state.id)
                                        ?
                                        <button id="unFollow-btn" className="btn pink waves-effect waves-light  sp-btn" onClick={unFollowUser(userInfo._id)}>Unfollow</button>
                                        :
                                        <button id="follow-btn" className="btn pink waves-effect waves-light sp-btn" onClick={followUser(userInfo._id)}>Follow</button>
                                }
                            </div>
                            <div className="col s4">
                                <Link to={`/direct/${userInfo._id}`}><button className="btn pink waves-effect waves-light sp-btn">Message</button></Link>
                            </div>
                            <div className="col s4">
                                {/* <a className="btn pink waves-effect waves-light sp-btn"
                                onClick={() => M.toast({ html: `<h4><a href="https://mail.google.com/mail/?view=cm&fs=1&to=someone@example.com&su=SUBJECT&body=BODY" target="_blank"> ${userInfo.email}</a></h4>`, classes: '#e91e63 pink' })}>Email</a> */}
                                <a className="btn pink waves-effect waves-light sp-btn"
                                    onClick={() => M.toast({ html: `${userInfo.email}`, classes: '#e91e63 pink' })}>Email</a>
                            </div>
                        </div>
                    </div>
                </div>
                : null}
            
            <div className="divider"></div>
            <div className="gallery">
                <div className="row">
                    {userPosts &&
                        userPosts.map(post => (
                            <div key={post._id} className="col s4 l4">
                                <img src={post.photo} alt={post.title} className="profile-posts responsive-img" />
                            </div>
                        ))
                    }
                </div>
            </div>

        </div>
        
        {/* The Connections Modal */}
        <FollowerModal name = {userInfo ? userInfo.name : null} id = {userInfo ? userInfo._id : null}/>
        <FollowingModal name = {userInfo ? userInfo.name : null} id = {userInfo ? userInfo._id : null} />

        </>
    )
}

export default UserProfile

