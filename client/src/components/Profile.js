import React, { useState, useEffect, useContext } from 'react'
import { userContext } from '../context/GlobalState'
import axios from 'axios'

function Profile() {


    const { state, dispatch } = useContext(userContext)
    const [userInfo, setUserinfo] = useState(null)
    const [userPosts, setUserPosts] = useState(null)
    const [profileImage, setProfileImage] = useState(null)
    const [url, setUrl] = useState('')


    useEffect(() => {

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
        if(profileImage) {
            changeProfilePic()
        }
    }, [profileImage])

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
                        type:'UPDATE_DP',
                        payload:res.data.updatedUser.photo
                    })

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
                                <input type="file" onChange={e => setProfileImage(e.target.files[0])}/>
                            </div>
                            <div className="file-path-wrapper" style={{display:"none"}}>
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
                                <img src={post.photo} alt={post.title} className="profile-posts responsive-img" />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Profile


