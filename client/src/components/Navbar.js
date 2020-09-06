import React,{ useEffect } from 'react'
import { Link } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import M from "materialize-css";

function Navbar() {

    useEffect( () => {
         // Auto initialize all the things!
         M.AutoInit();
    }, [])
    return (
        <>
            <nav className="nav-wrapper white z-depth-1">
                <div className="container">
                    <Link to="/" className="pink-text brand-logo">Shutter-UP</Link>
                    <a href="#" className="pink-text sidenav-trigger" data-target="mobile-links">
                        <i className="material-icons">menu</i>
                    </a>

                    <ul className="right hide-on-med-and-down">
                        <li><Link to="/" className="pink-text">Home</Link></li>
                        <li><Link to="/profile" className="pink-text">Profile</Link></li>
                        <li><Link to="/create" className="pink-text">Create Post</Link></li>
                        <li><a href="#" className="modal-trigger pink-text" data-target="modal-signup">Signup</a></li>                        
                        <li><a href="#" className="modal-trigger pink-text" data-target="modal-login">Login</a></li>
                    </ul>
                </div>
            </nav>

            <ul className="sidenav" id="mobile-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/create" className="pink-text">Create Post</Link></li>
                <li><a href="#" className="modal-trigger" data-target="modal-signup">Signup</a></li>
                <li><a href="#" className="modal-trigger" data-target="modal-login">Login</a></li>
            </ul>

            <Login/>
            <Signup/>
        </>
    )
}

export default Navbar
