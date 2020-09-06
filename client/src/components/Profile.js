import React from 'react'

function Profile() {
    return (
        <div className="container profile-page">
            <div className="row profile">
                <div className="col s12 l3 profile-img">
                    <img src="https://images.unsplash.com/photo-1525971996320-268f0402052f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" className="responsive-img materialboxed circle" />
                </div>
                <div className="col s12 l6 offset-l2 profile-desc">
                    <blockquote>
                        <h4>Arpan <span className="pink-text">Chowdhury</span></h4>
                    </blockquote>
                    <h5>@ ac_chowdhury</h5>
                    <div className="row">
                        <div className="col s4">
                            <h4>512</h4>
                            <p className="flow-text pink-text text-lighten-1">Posts</p>
                        </div>
                        <div className="col s4">
                            <h4>7000</h4>
                            <p className="flow-text pink-text text-lighten-1">Follower</p>
                        </div>
                        <div className="col s4">
                            <h4>212</h4>
                            <p className="flow-text pink-text text-lighten-1">Following</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="edit">
                <p className="flow-text center">Edit Profile</p>
            </div>
            <div className="row gallery">
                <div className="row">
                    <div className="col s4 l4">
                        <img src="https://images.unsplash.com/photo-1525971996320-268f0402052f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" className="responsive-img materialboxed" />
                    </div>
                    <div className="col s4 l4">
                        <img src="https://images.unsplash.com/photo-1525971996320-268f0402052f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" className="responsive-img materialboxed" />
                    </div>
                    <div className="col s4 l4">
                        <img src="https://images.unsplash.com/photo-1525971996320-268f0402052f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" className="responsive-img materialboxed" />
                    </div>
                    <div className="col s4 l4">
                        <img src="https://images.unsplash.com/photo-1525971996320-268f0402052f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" className="responsive-img materialboxed" />
                    </div>
                    <div className="col s4 l4">
                        <img src="https://images.unsplash.com/photo-1525971996320-268f0402052f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" className="responsive-img materialboxed" />
                    </div>
                    <div className="col s4 l4">
                        <img src="https://images.unsplash.com/photo-1525971996320-268f0402052f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" className="responsive-img materialboxed" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile



        // <div className="profile">
        //     <div className="img">
        //         <img  className="profile-img" src="https://images.unsplash.com/photo-1525971996320-268f0402052f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt=""/>
        //     </div>
        //     <div className="profile-info">
        //         <h4>Arpan Chowdhury</h4>
        //         <div className="profile-desc">
        //             <h5>50 Posts</h5>
        //             <h5>100 Follower</h5>
        //             <h5>100 following</h5>
        //         </div>
        //     </div>
        // </div>
        // <div className="gallery">
        //     <img src="https://images.unsplash.com/photo-1525971996320-268f0402052f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt=""/>
        //     <img src="https://images.unsplash.com/photo-1525971996320-268f0402052f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt=""/>
        //     <img src="https://images.unsplash.com/photo-1525971996320-268f0402052f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt=""/>
        //     <img src="https://images.unsplash.com/photo-1525971996320-268f0402052f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt=""/>
        //     <img src="https://images.unsplash.com/photo-1525971996320-268f0402052f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt=""/>
        //     <img src="https://images.unsplash.com/photo-1525971996320-268f0402052f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt=""/>
        // </div>
