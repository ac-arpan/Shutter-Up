import React, { useState } from 'react'

const ResetPassword = () => {

    const [email, setEmail] = useState('')

    return (
        <div className="container">
            <div className="row index-page">
                <div className="col s12 l6 offset-l3">
                    <div className="card">
                        <div className="card-content center">
                            <h5 className="pink-text" >Password Reset - Shutter-Up</h5>
                            <div className="input-field">
                                <i className="material-icons prefix">email</i>
                                <input type="email" id="login-email" required value={email} onChange={e => setEmail(e.target.value)} />
                                <label htmlFor="login-email">Email address</label>
                            </div>
                        </div>
                        <div className="card-action center">
                            <a href="#" className="btn pink">
                                <i className="material-icons left">email</i>
                                <span>send reset link</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword
