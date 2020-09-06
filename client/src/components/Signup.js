import React from 'react'
import M from "materialize-css";

function Signup() {

    const openSignIn =  () => {
        let signUpModal = document.querySelector('#modal-signup')
        let signInModal = document.querySelector('#modal-login')

        M.Modal.getInstance(signUpModal).close()
        M.Modal.getInstance(signInModal).open()
    }
    return (
        <>
            {/* SIGN UP MODAL */}
            <div id="modal-signup" className="modal">
                <div className="modal-content">
                    <h3 className="pink-text text-darken-1">Sign up</h3>
                    <form id="signup-form">
                        <div className="input-field">
                            <input type="email" id="signup-email" required />
                            <label htmlFor="signup-email">Email address</label>
                        </div>
                        <div className="input-field">
                            <input type="password" id="signup-password" required />
                            <label htmlFor="signup-password">Choose password</label>
                        </div>
                        <div className="input-field">
                            <input type="text" id="signup-bio" required />
                            <label htmlFor="signup-bio">One Line Bio</label>
                        </div>
                        <button className="btn pink darken-1 z-depth-1">
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
}

export default Signup
