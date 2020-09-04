import React from 'react'

function Login() {
    return (
        <>
            {/* LOGIN MODAL */}
            <div id="modal-login" className="modal">
                <div className="modal-content">
                    <h3 className="pink-text text-darken-1">Login</h3>
                    
                    <form id="login-form">
                        <div className="input-field">
                            <input type="email" id="login-email" required />
                            <label htmlFor="login-email">Email address</label>
                        </div>
                        <div className="input-field">
                            <input type="password" id="login-password" required />
                            <label htmlFor="login-password">Your password</label>
                        </div>
                        <button className="btn pink darken-1 z-depth-1">
                            <span>Login</span>
                            <i className="material-icons right">login</i>
                        </button>
                        <div id="signup" href="#" className="center pink-text">
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
