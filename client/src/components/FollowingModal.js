import React, { useState, useEffect, useContext } from 'react'
import { userContext } from '../context/GlobalState'
import axios from 'axios'
import { Link } from 'react-router-dom'

const FollowingModal = ({ name, id }) => {

    const [userId, setUserId] = useState(null)
    const [followings, setFollowings] = useState(null)
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

            axios.get(`/api/users/followings/${userId}`, config)
                .then(res => setFollowings(res.data))

                .catch(err => console.log(err))
        }
    }, [userId])


    return (
        <div id="modal-connection2" className="modal">
            <div className="modal-content">
                <h5 className="center pink-text">{name} follows</h5>

                <ul className="collection">
                    {
                        followings ? followings.map(following => (
                            <li key={following._id} className="collection-item avatar">
                                <img src={following.photo} alt="" className="circle" />
                                <Link to={state.id === following._id ? `/profile` : `/profile/${following._id}`}><span className="title modal-close">{following.name}</span></Link>
                                <Link to={state.id === following._id ? `/profile` : `/profile/${following._id}`}><em><p className="black-text modal-close">{following.username}</p></em></Link>
                                <a href="!#" className="secondary-content hide-on-med-and-down">
                                    {
                                        following._id === state.id ?
                                            <i className="material-icons pink-text">perm_identity</i>
                                            :
                                            following.followers.includes(state.id) ?
                                                <i id="unfollow-btn" className="material-icons pink-text">indeterminate_check_box</i>
                                                :
                                                <i id="follow-btn" className="material-icons pink-text">add_box</i>
                                    }
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

export default FollowingModal