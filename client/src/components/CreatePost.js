import React, { useState } from 'react'
import axios from 'axios'

function CreatePost() {

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [image, setImage] = useState({})
    const [url, setUrl] = useState('')

    // console.log(image, url)



    const postDetails = () => {
        const data = new FormData()

        data.append("file", image)
        data.append("upload_preset", 'shutter')
        data.append("cloud_name", 'shutter-up')

        console.log(data)
        axios.post('https://api.cloudinary.com/v1_1/shutter-up/image/upload', data)
            .then(res => {
                console.log(res.data)
                setUrl(res.data.secure_url)
            })
            .catch(err => console.log(err))
    }

    return (<>
        <div className="card z-depth-0" style={{ margin: '10px auto', maxWidth: "500px", padding: "20px", textAlign: "center" }}>
            <div className="card-content">
                <form>
                    <div className="input-field">
                        <i className="material-icons prefix">image</i>
                        <input type="text" id="post-title" required value={title} onChange={e => setTitle(e.target.value)} />
                        <label htmlFor="post-tile">Post Title</label>
                    </div>
                    <div className="input-field">
                        <i className="material-icons prefix">closed_caption</i>
                        <input type="text" id="post-body" required value={body} onChange={e => setBody(e.target.value)} />
                        <label htmlFor="post-body">Write Some Caption</label>
                    </div>

                    <div className="file-field input-field">
                        <div className="btn pink darken-1">
                            <span>Upload Image</span>
                            <input type="file" onChange={e => setImage(e.target.files[0])} />
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text"/>
                        </div>
                    </div>
                    <button className="btn waves-effect waves-light pink darken-1" onClick={postDetails}>Post</button>
                </form>
            </div>
        </div>
        <div className="container">
            <div className="row">
                <div className="col s12 offset-l4 l5">
                     {
                         url ? <img className="responsive-img" src={url}/> : ''
                     }
                </div>
            </div>
        </div>
        </>
    )

}

export default CreatePost

{/* <div class="file-field input-field">
<div class="btn">
  <span>File</span>
  <input type="file">
</div>
<div class="file-path-wrapper">
  <input class="file-path validate" type="text">
</div>
</div> */}
