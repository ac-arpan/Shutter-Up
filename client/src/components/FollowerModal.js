import React, { useState, useEffect, useContext } from 'react'
import { userContext } from '../context/GlobalState'
import axios from 'axios'
import { Link } from 'react-router-dom'

const FollowerModal = ({ name, id }) => {

    const [userId, setUserId] = useState(null)
    const [followers, setFollowers] = useState(null)
    const { state } = useContext(userContext)


    useEffect(() => {
        if (id) {
            setUserId(id)
        }
    }, [id])

    useEffect(() => {
        if (userId) {
            // the configurations
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }

            axios.get(`/api/users/followers/${userId}`, config)
                .then(res => setFollowers(res.data))

                .catch(err => console.log(err))
        }
    }, [userId])


    return (
        <div id="modal-connection" className="modal">
            <div className="modal-content">
                <h5 className="center pink-text">{name}'s followers</h5>

                <ul className="collection">
                    {
                        followers ? followers.map(follower => (
                            <li key={follower._id} className="collection-item avatar">
                                <img src={follower.photo} alt="" className="circle" />
                                <Link to={state.id === follower._id ? `/profile` : `/profile/${follower._id}`}><span className="title modal-close">{follower.name}</span></Link>
                                <Link to={state.id === follower._id ? `/profile` : `/profile/${follower._id}`}><em><p className="black-text modal-close">{follower.username}</p></em></Link>
                                <a href="!#" className="secondary-content hide-on-med-and-down">
                                    <i className="material-icons pink-text">add</i>
                                </a>
                            </li>
                        ))
                            : null
                    }
                </ul>

            </div>
        </div>
    )
}

export default FollowerModal
