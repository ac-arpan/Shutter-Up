import React from 'react'
import logo from './shutterUp.svg'


function Index() {
    return (
        <div className="container">
            <div className="row index-page">
                <div className="col s12 l6 offset-l3">
                    <div className="card">
                        <div className="card-content">
                            <div className="center" >
                                <img src={logo} className="auth-logo" />
                            </div>
                            <h4 className="pink-text center">Shutter Up</h4>
                            <p className="center">Share your beautiful Photos with the awesome people</p>
                        </div>
                        <div className="card-action center">
                            <a href="#" className="btn modal-trigger pink" data-target="modal-signup" style={{ marginRight: '10px' }}>
                                <i className="material-icons left">assignment_ind</i>
                                <span>signup</span>
                            </a>
                            <a href="#" className="btn modal-trigger pink" data-target="modal-login">
                                <i className="material-icons left">login</i>
                                <span>login</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index
