import React,{ useEffect } from 'react'
import logo from './shutterUp.svg'
import M from 'materialize-css'

export const SearchModal = () => {

    useEffect( () => {
        var autocomplete = document.querySelectorAll('.autocomplete');
        M.Autocomplete.init(autocomplete, {
            data: {
                'Arpan': null,
                'Anindita' : null
            }
        });
    }, [])

    return (
        <div id="modal-search" className="modal authModal">
            <div className="modal-content">
                <div className="center" >
                    <img src={logo} className="auth-logo" />
                </div>
                <h4 className="pink-text text-darken-1 center"> || Find your friends ||</h4>
                <br />

                <div className="row">
                    <div className="col s12">
                        <div className="row">
                            <div className="input-field col s12">
                                <i className="material-icons prefix pink-text">search</i>
                                <input type="text" id="autocomplete-input" className="autocomplete" />
                                <label htmlFor="autocomplete-input">Type any username or name</label>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>


    )
}
