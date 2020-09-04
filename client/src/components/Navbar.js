import React from 'react'
import { Link } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'

function Navbar() {
    return (
        <>
            <nav className="nav-wrapper pink darken-1">
                <div className="container">
                    <Link to="/" className="brand-logo">Shutter-UP</Link>
                    <a href="#" className="sidenav-trigger" data-target="mobile-links">
                        <i className="material-icons">menu</i>
                    </a>

                    <ul className="right hide-on-med-and-down">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><a href="#" className="modal-trigger" data-target="modal-signup">Signup</a></li>                        
                        <li><a href="#" className="modal-trigger" data-target="modal-login">Login</a></li>
                    </ul>
                </div>
            </nav>

            <ul className="sidenav" id="mobile-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><a href="#" className="modal-trigger" data-target="modal-signup">Signup</a></li>
                <li><a href="#" className="modal-trigger" data-target="modal-login">Login</a></li>
            </ul>

            <Login/>
            <Signup/>
        </>
    )
}

export default Navbar
