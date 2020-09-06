import React from 'react'

function CreatePost() {
    return (
        <div className="card" style={{margin:'10px auto', maxWidth:"500px", padding:"20px", textAlign:"center"}}>
            <input type="text" placeholder="Title"/>
            <input type="text" placeholder="Body"/>

            <div className="input-field file-field">
                <div className="btn">
                    <span>File</span>
                    <input type="file"/>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path-validate" type="text"/>
                </div>
            </div>
            <button className="btn waves-effect waves-light pink darken-1">Post</button>
        </div>
    )
}

export default CreatePost
