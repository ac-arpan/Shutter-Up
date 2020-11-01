import React, { useEffect, useContext } from 'react'
import { userContext } from '../context/GlobalState'
import axios from 'axios'
import logo from './shutterUp.svg'

const ChatList = () => {

    const { state } = useContext(userContext)

    return (
        <div className="container">
            <div className="card center grey lighten-5">
                <div className="card-content">
                    <div className="center" >
                        <img src={logo} className="auth-logo" />
                    </div>
                    <h4 className="pink-text text-darken-1">Shutter-Up Direct</h4>
                </div>
            </div>
            <div className="row">
                <div className="col s12 l6 offset-l3">
                    <div className="card">
                        <div className="card-content chat-list">
                            <ul className="collection">
                                <li className="collection-item avatar">
                                    <img src="https://images.unsplash.com/photo-1525971996320-268f0402052f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" className="circle" />
                                    <span className="title pink-text">Anindita Mitra</span>
                                    <p>Babu Khaiso!</p>
                                    <a href="#!" className="secondary-content"><i className="material-icons pink-text">grade</i></a>
                                </li>
                                <li className="collection-item avatar">
                                    <img src="https://images.unsplash.com/photo-1525971996320-268f0402052f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" className="circle" />
                                    <span className="title pink-text">Arnab Bhattacharyya</span>
                                    <p>Omago! Turuuuu Lab!</p>
                                    <a href="#!" className="secondary-content"><i className="material-icons pink-text">grade</i></a>
                                </li>
                                <li className="collection-item avatar">
                                    <img src="https://images.unsplash.com/photo-1525971996320-268f0402052f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" className="circle" />
                                    <span className="title pink-text">Rayan Chakrobarty</span>
                                    <p>Shutiye lal kore debo!</p>
                                    <a href="#!" className="secondary-content"><i className="material-icons pink-text">grade</i></a>
                                </li>
                                <li className="collection-item avatar">
                                    <img src="https://images.unsplash.com/photo-1525971996320-268f0402052f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" className="circle" />
                                    <span className="title pink-text">Rittwick Bhabak</span>
                                    <p>Hi there! How are how?</p>
                                    <a href="#!" className="secondary-content"><i className="material-icons pink-text">grade</i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatList
