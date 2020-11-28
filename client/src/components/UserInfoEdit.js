import React, { useState, useEffect, useContext } from 'react'
import { userContext } from '../context/GlobalState'
import axios from 'axios'

const UserInfoEdit = () => {

    const { state, dispatch } = useContext(userContext)

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')

    useEffect(() => {
        if (state) {

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }

            axios.get(`/api/users/edit/${state.id}`, config)
                .then(res => {
                    console.log(res.data)
                    setName(res.data.name)
                    setUsername(res.data.username)
                })
                .catch(err => console.log(err))
        }
    }, [state])

    const handleSubmit = e => {
        e.preventDefault()

    }



    return (
        <div className="container center">
            {state &&
                <div>
                    <h5 className="pink-text">{state.name} Profile Edit</h5>
                    <div className="row">
                        <div className="col s12 l6 offset-l3">
                            <form id="edit-form" onSubmit={handleSubmit}>
                                <div className="input-field">
                                    <i className="material-icons prefix">person</i>
                                    <input type="text" id="edit-name" required value={name} onChange={e => setName(e.target.value)} placeholder="Your Name" />
                                    <span className="helper-text left-align">Your display name</span>

                                </div>
                                <div className="input-field">
                                    <i className="material-icons prefix">mood</i>
                                    <input type="text" id="edit-username" required value={username} onChange={e => setUsername(e.target.value)} placeholder="Your Username" />
                                    <span className="helper-text left-align">Your display Username</span>

                                </div>
                                <button className="btn pink darken-1 z-depth-1" id="edit-btn">
                                    <span>save changes</span>
                                    <i className="material-icons right">save</i>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default UserInfoEdit
