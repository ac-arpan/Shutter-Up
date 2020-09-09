import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import logo from './shutterUp.svg'
import axios from 'axios'
import M from "materialize-css";

function Login() {

    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const openSignUp = () => {
        let signUpModal = document.querySelector('#modal-signup')
        let signInModal = document.querySelector('#modal-login')

        M.Modal.getInstance(signInModal).close()
        M.Modal.getInstance(signUpModal).open()
    }

    const resetForm = () => {
        const inputs = document.getElementById('login-form').getElementsByTagName('input')
        Array.from(inputs).forEach(input => {
            input.nextSibling.classList.remove('active')
        });
    }
    const handleSubmit = e => {
        e.preventDefault()
        // Headers
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        // Request Body
        const body = JSON.stringify({ email, password })

        axios.post('/api/auth', body, config)
            .then(res => {
                console.log(res.data)
                setEmail('')
                setPassword('')

                let signInModal = document.querySelector('#modal-login')
                M.Modal.getInstance(signInModal).close()
                resetForm()
                M.toast({ html: `Welcome ${res.data.user.username}`, classes: '#e91e63 pink' })
                history.push('/')

            })
            .catch(err => {
                M.toast({ html: err.response.data.msg, classes: 'e91e63 pink' })
            })

    }
    return (
        <>
            {/* LOGIN MODAL */}
            <div id="modal-login" className="modal">
                <div className="modal-content">
                    <div className="center" >
                        <img src={logo} className="auth-logo" />
                    </div>
                    <h4 className="pink-text text-darken-1">Login</h4>
                    <br />

                    <form id="login-form" onSubmit={handleSubmit}>
                        <div className="input-field">
                            <i className="material-icons prefix">email</i>
                            <input type="email" id="login-email" required value={email} onChange={e => setEmail(e.target.value)} />
                            <label htmlFor="login-email">Email address</label>
                        </div>
                        <div className="input-field">
                            <i className="material-icons prefix">vpn_key</i>
                            <input type="password" id="login-password" required value={password} onChange={e => setPassword(e.target.value)} />
                            <label htmlFor="login-password">Your password</label>
                        </div>
                        <button className="btn pink darken-1 z-depth-1">
                            <span>Login</span>
                            <i className="material-icons right">login</i>
                        </button>
                        <div id="signup" href="#" className="center pink-text" onClick={openSignUp}>
                            Didn't have an account ? SignUp
                        </div>
                        <p className="error pink-text center-align"></p>
                    </form>
                </div>
            </div>

        </>
    )
}

export default Login
