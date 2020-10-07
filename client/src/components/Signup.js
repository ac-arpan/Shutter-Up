import React, { useState, useContext, useEffect } from 'react'
import { userContext } from '../context/GlobalState'
import axios from 'axios'
import logo from './shutterUp.svg'
import M from "materialize-css";

function Signup() {

    const { state } = useContext(userContext)
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [profileImage, setProfileImage] = useState('')
    const [url, setUrl] = useState('')


    useEffect(() => {
        if (url) {
            console.log(url)
            handleSubmit()
        }
    }, [url])

    const openSignIn = () => {
        let signUpModal = document.querySelector('#modal-signup')
        let signInModal = document.querySelector('#modal-login')

        M.Modal.getInstance(signUpModal).close()
        M.Modal.getInstance(signInModal).open()
    }

    const resetForm = () => {
        let inputs = document.getElementById('signup-form').getElementsByTagName('input')
        console.log(inputs)
        inputs = Array.from(inputs)
        console.log(inputs)

        inputs.pop()
        console.log(inputs)
        inputs.pop()
        console.log(inputs)
        inputs.forEach(input => {
            input.nextSibling.classList.remove('active')
        });
    }
    const handleSubmit = () => {

        // Headers
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const photoUrl = url ? url : "https://images.unsplash.com/photo-1525971996320-268f0402052f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
        // Request Body
        const body = JSON.stringify({ name, username, email, password, photo: photoUrl })

        axios.post('/api/users', body, config)
            .then(res => {
                // console.log(res.data)
                setName('')
                setUsername('')
                setEmail('')
                setPassword('')

                let signUpModal = document.querySelector('#modal-signup')
                M.Modal.getInstance(signUpModal).close()
                resetForm()
                M.toast({ html: 'SignUp Successful!', classes: '#e91e63 pink' })
                openSignIn()

            })
            .catch(err => {
                console.log(err)
                M.toast({ html: err.response.data.msg, classes: 'e91e63 pink' })
                document.querySelector('#reg-btn').classList.remove('disabled')
                document.querySelector('#reg-btn').classList.remove('pulse')
            })

    }

    const postImage = e => {

        e.preventDefault()

        document.querySelector('#reg-btn').classList.add('disabled')
        document.querySelector('#reg-btn').classList.add('pulse')

        if (profileImage) {
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

        } else {
            handleSubmit()
        }


    }

    if (!state) {
        return (
            <>
                {/* SIGN UP MODAL */}
                <div id="modal-signup" className="modal authModal">
                    <div className="modal-content">
                        <div className="center" >
                            <img src={logo} className="auth-logo" />
                        </div>
                        <h4 className="pink-text text-darken-1" >Sign up</h4>
                        <br />
                        <form id="signup-form" onSubmit={postImage}>
                            <div className="input-field">
                                <i className="material-icons prefix">account_circle</i>
                                <input type="text" id="signup-name" required value={name} onChange={e => setName(e.target.value)} />
                                <label htmlFor="signup-bio">Name</label>
                            </div>
                            <div className="input-field">
                                <i className="material-icons prefix">face</i>
                                <input type="text" id="signup-username" required value={username} onChange={e => setUsername(e.target.value)} />
                                <label htmlFor="signup-bio">Username</label>
                            </div>
                            <div className="input-field">
                                <i className="material-icons prefix">email</i>
                                <input type="email" id="signup-email" required value={email} onChange={e => setEmail(e.target.value)} />
                                <label htmlFor="signup-email">Email address</label>
                            </div>
                            <div className="input-field">
                                <i className="material-icons prefix">vpn_key</i>
                                <input type="password" id="signup-password" required value={password} onChange={e => setPassword(e.target.value)} />
                                <label htmlFor="signup-password">Choose password</label>
                            </div>
                            <div className="file-field input-field">
                                <div className="btn pink darken-1">
                                    <span>Choose Profile Pic</span>
                                    <input type="file" onChange={e => setProfileImage(e.target.files[0])} />
                                </div>
                                <div className="file-path-wrapper">
                                    <input className="file-path validate" type="text" />
                                </div>
                            </div>
                            <button className="btn pink darken-1 z-depth-1" id="reg-btn">
                                <span>Signup</span>
                                <i className="material-icons right">assignment_ind</i>
                            </button>
                            <div id="login" href="#" className="center pink-text" onClick={openSignIn}>
                                Already have an account ? Login
                        </div>
                            <p className="error pink-text center-align"></p>
                        </form>
                    </div>
                </div>

            </>
        )
    } else {
        return (
            <div id="modal-signup" className="modal">
                <div className="modal-content">
                    <div className="center" >
                        <img src={logo} className="auth-logo" />
                    </div>
                    <p className="flow-text center">Please Logout First!</p>
                </div>
            </div>
        )
    }
}

export default Signup
