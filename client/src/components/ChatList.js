import React, { useState, useEffect, useContext } from 'react'
import { userContext } from '../context/GlobalState'
import axios from 'axios'
import logo from './shutterUp.svg'
import { Link } from 'react-router-dom'

const ChatList = () => {

    const { state } = useContext(userContext)
    const [users, setUsers] = useState(null)

    useEffect(() => {

        // the configurations
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        axios.get('/api/users/chatList', config)
            .then(res => {
                // console.log(res.data)
                setUsers(res.data)
            })
            .catch(err => console.log(err))
    }, [])

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
                                {
                                    users ?
                                        users.length > 0 ?
                                            users.map(user => (
                                                <Link key={user._id} to={`/direct/${user._id}`}><li  className="collection-item avatar">
                                                    <img src={user.photo} alt="userImage" className="circle" />
                                                    <span className="title pink-text">{user.name}</span>
                                                    <p style={{ fontStyle: 'italic', fontWeight: 'bold', color: 'grey' }}>{user.username}</p>
                                                    <div  className="secondary-content"><i className="material-icons pink-text">grade</i></div>
                                                </li></Link>
                                            ))
                                            : <div className="center pink-text text-lighten-2" style={{ margin: '100px auto' }}>
                                                <div>
                                                    <i className="large material-icons center pink-text text-lighten-2">mood_bad</i>
                                                </div>
                                                <p className="flow-text" style={{ marginBottom: '10px' }}>Oops! No one to talk? How about making some connection!</p>
                                                <Link to="/"><div className="btn pink">Trending</div></Link>
                                            </div>
                                        :
                                        <div className="center" style={{ margin: '100px auto' }}>
                                            <div className="preloader-wrapper small active">
                                                <div className="spinner-layer spinner-blue">
                                                    <div className="circle-clipper left">
                                                        <div className="circle"></div>
                                                    </div><div className="gap-patch">
                                                        <div className="circle"></div>
                                                    </div><div className="circle-clipper right">
                                                        <div className="circle"></div>
                                                    </div>
                                                </div>

                                                <div className="spinner-layer spinner-red">
                                                    <div className="circle-clipper left">
                                                        <div className="circle"></div>
                                                    </div><div className="gap-patch">
                                                        <div className="circle"></div>
                                                    </div><div className="circle-clipper right">
                                                        <div className="circle"></div>
                                                    </div>
                                                </div>

                                                <div className="spinner-layer spinner-yellow">
                                                    <div className="circle-clipper left">
                                                        <div className="circle"></div>
                                                    </div><div className="gap-patch">
                                                        <div className="circle"></div>
                                                    </div><div className="circle-clipper right">
                                                        <div className="circle"></div>
                                                    </div>
                                                </div>

                                                <div className="spinner-layer spinner-green">
                                                    <div className="circle-clipper left">
                                                        <div className="circle"></div>
                                                    </div><div className="gap-patch">
                                                        <div className="circle"></div>
                                                    </div><div className="circle-clipper right">
                                                        <div className="circle"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatList
