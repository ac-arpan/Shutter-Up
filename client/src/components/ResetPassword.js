import React, { useState } from 'react'
import axios from 'axios'
import M from 'materialize-css'
import logo from './shutterUp.svg'

const ResetPassword = () => {

    const [email, setEmail] = useState('')
    const [reply, setReply] = useState(null)

    const handleSubmit = e => {
        e.preventDefault()
        document.querySelector('#mail-send').classList.add('disabled')
        document.querySelector('#mail-send').classList.add('pulse')
        // Headers
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        // Request Body
        const body = JSON.stringify({ email })

        axios.post('/api/auth/resetPassword', body, config)
            .then(res => {
                // setEmail('')
                setReply(res.data.msg)
                
                document.querySelector('#mail-send').classList.remove('disabled')
                document.querySelector('#mail-send').classList.remove('pulse')
            })
            .catch(err => {
                M.toast({ html: err.response.data.msg, classes: 'e91e63 pink' })
                document.querySelector('#mail-send').classList.remove('disabled')
                document.querySelector('#mail-send').classList.remove('pulse')
            })

    }

    return (
        <div className="container">
            <div className="row index-page">
                <div className="col s12 l6 offset-l3">
                    <div className="card">
                        <div className="card-content center">
                            <h5 className="pink-text" >Password Reset - Shutter-Up</h5>
                            <div className="center" >
                                <img src={logo} className="auth-logo" />
                            </div>
                            <div className="input-field">
                                <i className="material-icons prefix">email</i>
                                <input type="email" id="login-email" required value={email} onChange={e => setEmail(e.target.value)} />
                                <label htmlFor="login-email">Email address</label>
                            </div>
                            <div className="center">
                                {reply ? <p>{reply}</p> : null}
                            </div>
                        </div>
                        <div className="card-action center">
                            <button href="#" id="mail-send" className="btn pink" onClick={handleSubmit}>
                                <i className="material-icons left">email</i>
                                <span>send reset link</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword
