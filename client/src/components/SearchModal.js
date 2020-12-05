import React, { useEffect, useState, useContext } from 'react'
import { userContext } from '../context/GlobalState'
import logo from './shutterUp.svg'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import M from 'materialize-css'

export const SearchModal = () => {

    const [users, setUsers] = useState(null)
    const [searchData, setSearchData] = useState(null)
    const [searchUserId, setSearchUserId] = useState(null)
    const history = useHistory()
    const { state } = useContext(userContext)

    const closeSearch = () => {
        let searchModal = document.querySelector('#modal-search')
        searchModal.querySelector('#autocomplete-input').value = null
        M.Modal.getInstance(searchModal).close()
    }

    const searchId = () => {
        let searchModal = document.querySelector('#modal-search')
        const name = searchModal.querySelector('#autocomplete-input').value

        users.forEach(user => {
            if(user.name === name) {
                setSearchUserId(user._id)
            }
        })
    }

    useEffect(() => {

        // the configurations
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }

        axios.get('/api/users/search', config)
            .then(res => {
                // console.log(res.data)
                setUsers(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        const data = {}
        if (users) {
            users.forEach(user => {
                data[`${user.name}`] = `${user.photo}`
            })
            // console.log(data)
            setSearchData(data)
        }

    }, [users])

    useEffect(() => {
        if (searchData) {
            let autocomplete = document.querySelectorAll('.autocomplete');
            M.Autocomplete.init(autocomplete, {
                data: searchData,
                onAutocomplete: () => {
                    searchId()
                }
            });
        }
    }, [searchData])

    useEffect(() => {
        if (searchUserId) {
            if(searchUserId === state.id) {
                history.push(`/profile`)
                closeSearch()
                setSearchUserId(null)
            } else {
                history.push(`/profile/${searchUserId}`)
                closeSearch()
                setSearchUserId(null)
            }
        }
    }, [searchUserId])


    return (
        <div id="modal-search" className="modal authModal">
            <div className="modal-content">
                <div className="center" >
                    <img src={logo} className="auth-logo" />
                </div>
                <h6 className="grey-text text-lighten-2 center">Please refresh once if suggestions don't appear!</h6>
                <h5 className="pink-text text-darken-1 center"> || Find your friends ||</h5>
                <br />

                <div className="row">
                    <div className="col s12">
                        <div className="row">
                            <div className="input-field col s12">
                                <i className="material-icons prefix pink-text">search</i>
                                <input type="text" id="autocomplete-input" className="autocomplete" placeholder="search for users with their name..." autoComplete="off"/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>


    )
}
