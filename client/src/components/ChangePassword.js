import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import M from 'materialize-css'
import logo from './shutterUp.svg'

const ChangePassword = () => {


    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const history = useHistory()
    const { token } = useParams()

    // const [reply, setReply] = useState(null)

    const handleSubmit = e => {
        e.preventDefault()
        document.querySelector('#mail-send').classList.add('disabled')

        if(password !== confirmPassword) {
            M.toast({ html: 'Password Unmatched', classes: 'e91e63 pink' })
            document.querySelector('#mail-send').classList.remove('disabled')
            return
        }
        // Headers
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        // Request Body
        const body = JSON.stringify({ password, token })

        axios.post('/api/auth/changePassword', body, config)
            .then(res => {
                // setReply(res.data.msg)

                M.toast({ html: res.data.msg, classes: 'e91e63 pink' })

                history.push('/index')

                // document.querySelector('#mail-send').classList.remove('disabled')
            })
            .catch(err => {
                // M.toast({ html: err.response.data.msg, classes: 'e91e63 pink' })
                console.log(err)
                document.querySelector('#mail-send').classList.remove('disabled')
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
                                <input type="password" required value={password} onChange={e => setPassword(e.target.value)} />
                                <label htmlFor="login-email">Choose Password</label>
                            </div>
                            <div className="input-field">
                                <i className="material-icons prefix">email</i>
                                <input type="password" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                                <label htmlFor="login-email">Confirm Password</label>
                            </div>
                            {/* <div className="center">
                                {reply ? <p>{reply}</p> : null}
                            </div> */}
                        </div>
                        <div className="card-action center">
                            <button href="#" id="mail-send" className="btn pink" onClick={handleSubmit}>
                                <i className="material-icons left">email</i>
                                <span>Reset Password</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword
