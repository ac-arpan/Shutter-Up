import React, { useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { userContext } from '../context/GlobalState'
import { Link } from 'react-router-dom'
import logo from './shutterUp.svg'
import Login from './Login'
import Signup from './Signup'
import M from "materialize-css";

function Navbar() {

    const history = useHistory()
    const { state, dispatch } = useContext(userContext)

    const logout = async () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')

        await dispatch({
            type: 'LOGOUT'
        })

        history.push('/index')

    }

    const navLinks = () => {
        if (state) {
            return [
                <li key="1"><Link to="/" className="pink-text">Home</Link></li>,
                <li key="2"><Link to="/profile" className="pink-text">Profile</Link></li>,
                <li key="5"><Link to="/profile" className="btn pink z-depth-1" onClick={logout}>
                    <span>Log Out</span>
                    <i className="material-icons right white-text">lock_outline</i>
                </Link></li>,
            ]
        } else {
            return [
                <li key="3"><a href="#" className="modal-trigger pink-text" data-target="modal-signup">Signup</a></li>,
                <li key="4"><a href="#" className="modal-trigger pink-text" data-target="modal-login">Login</a></li>
            ]
        }

    }

    useEffect(() => {
        // Auto initialize all the things!
        M.AutoInit();
    }, [])
    return (
        <>
            <nav className="nav-wrapper white z-depth-0">
                <div className="container">
                    <Link to={state ? '/' : '/index'} className="pink-text brand-logo"><i className="material-icons"><img src={logo} className="nav-logo" /></i></Link>
                    <a href="#" className="pink-text sidenav-trigger" data-target="mobile-links">
                        <i className="material-icons">menu</i>
                    </a>

                    <ul className="right hide-on-med-and-down">
                        {navLinks()}
                    </ul>
                </div>
            </nav>

            <ul className="sidenav" id="mobile-links">
                {navLinks()}
            </ul>


            {/* login Modal */}
            <Login />
            {/* signup Modal */}
            <Signup />


            {
                state ?
                    <div className="fixed-action-btn">
                        <Link to="/create" className="btn-floating btn-large pink darken-1">
                            <i className="material-icons">add</i>
                        </Link>
                    </div> : null
            }
        </>
    )
}

export default Navbar
