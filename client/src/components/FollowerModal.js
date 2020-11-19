import React from 'react'

const FollowerModal = ({ name, id }) => {

    return (
        <div id="modal-connection" className="modal">
            <div className="modal-content">
                <h4 className="center">{name}'s followers</h4>
            </div>
        </div>
    )
}

export default FollowerModal
