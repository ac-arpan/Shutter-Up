import React, { useState, useEffect, useContext, useRef } from 'react'
import { userContext } from '../context/GlobalState'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import M from 'materialize-css'

const PersonalChat = () => {

    const { chatId } = useParams()
    const { state } = useContext(userContext)
    const intervalRef = useRef()

    const [messages, setMessages] = useState(null)
    const [reciever, setReciever] = useState(null)
    const [prev, setPrev] = useState([])
    const [message, setMessage] = useState('')

    useEffect(() => {

        if (messages) {
            if (prev.length !== messages.length) {
                const chatBox = document.getElementsByClassName('chat-box')[0]
                const chatBoxHeight = chatBox.scrollHeight

                chatBox.scrollTo({
                    top: chatBoxHeight
                    // behavior: "smooth"
                })
            }
        }
    }, [messages])

    useEffect(() => {

        const m = setInterval(() => {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }


            axios.get(`/api/messages/${chatId}`, config)
                .then(res => {
                    // console.log(res.data)

                    setMessages(res.data)
                    setPrev(res.data)

                })
                .catch(err => console.log(err))

        }, 1000)
        return () => {
            clearInterval(m)
        }
    }, [])


    useEffect(() => {

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }


        axios.get(`/api/messages/info/${chatId}`, config)
            .then(res => {
                setReciever(res.data[0])
            })
            .catch(err => console.log(err))
    }, [])

    const saveMessage = e => {
        e.preventDefault()

        if (message.length === 0) {
            M.toast({ html: 'Please add a message!', classes: '#e91e63 pink' })

            document.querySelector('#send-btn').classList.remove('disabled')
            document.querySelector('#send-btn').classList.remove('pulse')

            return
        }

        document.querySelector('#send-btn').classList.add('disabled')
        document.querySelector('#send-btn').classList.add('pulse')

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }

        const postBody = JSON.stringify({ sender: state.id, reciever: reciever._id, message: message })

        axios.post('/api/messages', postBody, config)
            .then(response => {
                document.querySelector('#send-btn').classList.remove('disabled')
                document.querySelector('#send-btn').classList.remove('pulse')

                setMessage('')

            })
            .catch(err => {
                console.log(err)
            })
    }


    return (
        <div className="container">
            <div className="row" style={{ marginTop: '50px' }}>
                <div className="center col s12 l4 offset-l4">
                    <Link to="/direct"><button className="btn pink z-depth-1 waves-effect">
                        <span>Friend List</span>
                        <i className="material-icons right">forum</i>
                    </button>
                    </Link>
                </div>
            </div>
            <div className="row" style={{ marginTop: '30px' }}>
                <div className="col s12 l8 offset-l2">
                    <div className="card chat-container">
                        <div className="card-content">
                            <ul className="chat-head collection">
                                <li className="collection-item avatar pink lighten-5">
                                    <img src={reciever ? reciever.photo : "https://image.shutterstock.com/image-vector/user-icon-trendy-flat-style-260nw-418179865.jpg"} alt="" className="circle" style={{ border: '2px solid rgb(255, 27, 65)' }} />
                                    <Link to={`/profile/${chatId}`}><span className="title" style={{ fontStyle: 'italic', fontWeight: 'bold', color: 'black' }}>{reciever ? reciever.username : <p>...............</p>}</span></Link>
                                    <Link to={`/profile/${chatId}`}><div>{reciever ? reciever.name : <p>..........</p>}</div></Link>

                                </li>
                            </ul>
                            <div className="chat-box">
                                {
                                    messages ?
                                        messages.length > 0 ?
                                            messages.map(message => {
                                                if (message.reciever._id === state.id) {
                                                    return (
                                                        <div key={message._id} className="row" style={{ margin: '0px', padding: '5px' }}>
                                                            <div className="col s12 chat you">
                                                                <p className="white-text">{message.message}</p>
                                                            </div>
                                                        </div>
                                                    )
                                                } else if (message.sender._id === state.id) {
                                                    return (
                                                        <div key={message._id} className="row" style={{ margin: '0px', padding: '5px' }}>
                                                            <div className="col s12 chat right me">
                                                                <p className="white-text">{message.message}</p>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            }) : <div className="center">How about starting a chat ? </div>

                                        : <div>Loading...</div>

                                }


                            </div>
                        </div>
                        <div className="card-action row">
                            <ul className="collection">
                                <li className="collection-item avatar">
                                    <img src={state ? state.photo : null} alt="" className="circle" style={{ border: '2px solid rgb(255, 27, 65)' }} />
                                    <span className="title">
                                        <form onSubmit={saveMessage}>
                                            <div className="input-field" style={{ width: '80%' }}>
                                                <input type="text" name="comment" placeholder="Type Something..." value={message} onChange={e => setMessage(e.target.value)} />
                                            </div>
                                        </form>
                                    </span>
                                    <div id="send-btn" className="btn-floating secondary-content pink waves-effect waves-light"><i className="material-icons " onClick={saveMessage}>send</i></div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default PersonalChat

