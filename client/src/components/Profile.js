import React, { useState, useEffect, useContext } from 'react'
import { userContext } from '../context/GlobalState'
import { Link } from 'react-router-dom'
import axios from 'axios'
import M from 'materialize-css'

function Profile() {


    const { state, dispatch } = useContext(userContext)
    const [userInfo, setUserinfo] = useState(null)
    const [userPosts, setUserPosts] = useState(null)
    const [profileImage, setProfileImage] = useState(null)
    const [url, setUrl] = useState('')
    const [bookmarkedPost, setBookmarkedPost] = useState(null)


    useEffect(() => {

        let tabs = document.querySelectorAll('.tabs')
        M.Tabs.init(tabs)

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        axios.get('/api/posts/profile', config)
            .then(res => {
                setUserinfo(res.data)
                setUserPosts(res.data.posts)
                getBookmarked()
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        if (url) {
            console.log(url)
            handleSubmit()
        }
    }, [url])

    useEffect(() => {
        if (profileImage) {
            changeProfilePic()
        }
    }, [profileImage])

    const getBookmarked = () => {

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }

        axios.get('/api/users/bookmarked', config)
            .then(res => {
                setBookmarkedPost(res.data.bookmarkedPost)
            })
            .catch(err => console.log(err))
    }

    const changeProfilePic = () => {
        // e.preventDefault()

        document.querySelector('#change-dp').classList.add('disabled')
        document.querySelector('#change-dp').classList.add('pulse')

        // Posting the image to the cloudinary
        const data = new FormData()

        data.append("file", profileImage)
        data.append("upload_preset", 'shutter')
        data.append("cloud_name", 'shutter-up')

        console.log(data)
        axios.post('https://api.cloudinary.com/v1_1/shutter-up/image/upload', data)
            .then(res => {
                console.log(res.data)
                setUrl(res.data["secure_url"])
            })
            .catch(err => console.log(err))

    }

    const handleSubmit = () => {
        // make a put request to save the updated pic to the db
        console.log(`Making database request to /api/users/changePic/${userInfo.userId}`)

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        const postBody = JSON.stringify({ photo: url })
        axios.put('/api/users/changePic', postBody, config)
            .then(res => {
                console.log(res.data)
                setUserinfo(res.data.updatedUser)

                dispatch({
                    type: 'UPDATE_DP',
                    payload: res.data.updatedUser.photo
                })

                let user = JSON.parse(localStorage.getItem('user'))
                user.photo = res.data.updatedUser.photo
                localStorage.setItem('user', JSON.stringify(user))

                document.querySelector('#change-dp').classList.remove('disabled')
                document.querySelector('#change-dp').classList.remove('pulse')
                document.querySelector('#pic-field').value = null
            })
            .catch(err => console.log(err))

    }
    return (
        <div className="container profile-page">
            { userInfo && userPosts ?
                <div className="row profile">
                    <div className="col s12 l3 profile-img center">
                        <img src={userInfo.photo} alt="" className="responsive-img circle p-img" />
                        <div className="file-field input-field parent-file ">
                            <div className="btn-small pink waves-effect waves-light" id="change-dp">
                                <i className="material-icons">add</i>
                                <input type="file" onChange={e => setProfileImage(e.target.files[0])} />
                            </div>
                            <div className="file-path-wrapper" style={{ display: "none" }}>
                                <input id="pic-field" className="file-path validate" type="text" placeholder="Change Pic" />
                            </div>
                        </div>
                        {/* <div id="change-dp" className="btn pink waves-effect waves-light" onClick={changeProfilePic}> Change </div> */}
                    </div>
                    <div className="col s12 l6 offset-l2 profile-desc">
                        <blockquote>
                            <h4>{userInfo['name'] && userInfo.name.split(' ')[0]} <span className="pink-text">{userInfo['name'] && userInfo.name.split(' ')[1]}</span></h4>
                        </blockquote>
                        <h5>{userInfo.username}</h5>
                        <div className="row">
                            <Link to={`/userPostList/${userInfo._id}`}><div className="col s4">
                                <h4 style={{ color: 'black' }}>{userPosts.length}</h4>
                                <p className="flow-text pink-text text-lighten-1">Posts</p>
                            </div></Link>
                            <div className="col s4">
                                <h4>{userInfo.followers.length}</h4>
                                <p className="flow-text pink-text text-lighten-1">Follower</p>
                            </div>
                            <div className="col s4">
                                <h4>{userInfo.followings.length}</h4>
                                <p className="flow-text pink-text text-lighten-1">Following</p>
                            </div>
                        </div>
                    </div>
                </div>
                : null}
            <div className="edit">
                <p className="flow-text center">Edit Profile</p>
            </div>

            <div className="row">
                <div className="col s12">
                    <ul className="tabs">
                        <li className="tab col s6"><a className="active" href="#test1"><i className="material-icons pink-text text-darken-1">collections</i></a></li>
                        <li className="tab col s6"><a href="#test2"><i className="material-icons pink-text text-darken-1">bookmark</i></a></li>
                    </ul>
                </div>
                <div id="test1" className="col s12">
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
                <div id="test2" className="col s12">
                    {bookmarkedPost ?
                        bookmarkedPost.length > 0 ? 
                            <div className="gallery">
                                <div className="row">
                                    {
                                        bookmarkedPost.map(post => (
                                            <div  key={post[0]} className="col s4 l4">
                                                <img src={post[1]} alt='Bookmarked Post' className="profile-posts responsive-img" />
                                            </div>
                                        ))
                                    }
                                </div>
                            </div> : <div className="center">You don't have any bookmarked post!</div> 
                        : null}
                </div>
            </div>
        </div>
    )
}

export default Profile


