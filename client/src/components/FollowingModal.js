import React from 'react'

const FollowingModal = ({ name, id }) => {
    return (
        <div id="modal-connection2" className="modal">
            <div className="modal-content">
                    <h4 className="center">{name} follows</h4>
            </div>
        </div>
    )
}

export default FollowingModal
