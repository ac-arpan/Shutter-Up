import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

const PersonalChat = () => {

    const { chatId } = useParams()

    useEffect( () => {
        const chatBox = document.getElementsByClassName('chat-box')[0]
        const chatBoxHeight = chatBox.scrollHeight

        chatBox.scrollTo({
            top: chatBoxHeight
            // behavior: "smooth"
        })
    })

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
                                    <img src="https://images.unsplash.com/photo-1525971996320-268f0402052f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" className="circle" style={{ border: '2px solid rgb(255, 27, 65)' }} />
                                    <Link to={`/profile/${chatId}`}><span className="title" style={{ fontStyle: 'italic', fontWeight: 'bold', color: 'black' }}>The all initial</span></Link>
                                    <Link to={`/profile/${chatId}`}><p>John Doe</p></Link>

                                </li>
                            </ul>
                            <div className="chat-box">
                                <div className="row" style={{margin: '0px', padding: '5px'}}>
                                    <div className="col s12 pink chat">
                                        <p className="white-text">Message</p>
                                    </div>
                                </div>
                                
                                <div className="row" style={{margin: '0px', padding: '5px'}}>
                                    <div className="col s12 pink chat right">
                                        <p className="white-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, sequi.</p>
                                    </div>
                                </div>
                                
                                <div className="row" style={{margin: '0px', padding: '5px'}}>
                                    <div className="col s12 pink chat  right">
                                        <p className="white-text">Lorem ipsum dolor sit amet.</p>
                                    </div>
                                </div>
                                
                                <div className="row" style={{margin: '0px', padding: '5px'}}>
                                    <div className="col s12 pink chat">
                                        <p className="white-text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium voluptatem aut possimus iure architecto itaque quas voluptatum ratione inventore iste?</p>
                                    </div>
                                </div>
                                
                                <div className="row" style={{margin: '0px', padding: '5px'}}>
                                    <div className="col s12 pink chat">
                                        <p className="white-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, ratione.</p>
                                    </div>
                                </div>
                                <div className="row" style={{margin: '0px', padding: '5px'}}>
                                    <div className="col s12 pink chat right">
                                        <p className="white-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt quod ullam debitis ut magni excepturi quibusdam in iusto sint consequatur. </p>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <div className="card-action row">
                            <ul className="collection">
                                <li className="collection-item avatar">
                                    <img src="https://images.unsplash.com/photo-1525971996320-268f0402052f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" className="circle" style={{ border: '2px solid rgb(255, 27, 65)' }} />
                                    <span className="title">
                                        <form>
                                            <div className="input-field" style={{width: '80%'}}>
                                                <input type="text" name="comment" placeholder="Type Something..." />
                                            </div>
                                        </form>
                                    </span>
                                    <div href="#!" className="btn-floating secondary-content pink waves-effect waves-light"><i className="material-icons ">send</i></div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PersonalChat

