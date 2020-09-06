import React from 'react'

function Home() {
    return (
        <div className="home">
            <div className="card home-card">
                <h5>Arpan</h5>
                <div className="card-image">
                    <img src="https://images.unsplash.com/photo-1508739773434-c26b3d09e071?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt=""/>
                </div>
                <div className="card-content">
                    <i className="material-icons red-text">favorite</i>
                    <h6>Title</h6>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod laborum in alias ipsum est ipsam enim, necessitatibus laboriosam veniam porro!</p>
                    <input type="text" placeholder="add a comment"/>
                </div>
            </div>
        </div>
    )
}

export default Home
