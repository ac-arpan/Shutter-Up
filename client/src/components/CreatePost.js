import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import M from 'materialize-css'

function CreatePost() {

    const history = useHistory()
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [image, setImage] = useState({})
    const [url, setUrl] = useState('')

    useEffect( () => {
        if(url) {
            console.log(url)
            createPost()
        }
    }, [url])

    const createPost = () => {
        // Post to the express server the actual post
        // Headers
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        // Request Body
        const postBody = JSON.stringify({ title, body, photo: url  })
        console.log(postBody)

        axios.post('/api/posts/create', postBody, config)
            .then(res => {
                console.log(res.data)
                M.toast({ html: 'post created successfully', classes: 'e91e63 pink' })
                history.push('/profile')

            })
            .catch(err => {
                M.toast({ html: err.response.data.msg, classes: 'e91e63 pink' })
                document.querySelector('#create-btn-one').classList.remove('disabled')
                document.querySelector('#create-btn-one').classList.remove('pulse')
            })
    }


    const postImage = e => {

        document.querySelector('#create-btn-one').classList.add('disabled')
        document.querySelector('#create-btn-one').classList.add('pulse')
        
        e.preventDefault()
        // Posting the image to the cloudinary
        const data = new FormData()

        data.append("file", image)
        data.append("upload_preset", 'shutter')
        data.append("cloud_name", 'shutter-up')

        console.log(data)
        axios.post('https://api.cloudinary.com/v1_1/shutter-up/image/upload', data)
            .then(res => {
                console.log(res.data)
                setUrl(res.data["secure_url"])
            })
            .catch(err => {console.log(err)
                document.querySelector('#create-btn-one').classList.remove('disabled')
                document.querySelector('#create-btn-one').classList.remove('pulse')
            })


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
                            <input className="file-path validate" type="text" />
                        </div>
                    </div>
                    <button id="create-btn-one" className="btn waves-effect waves-light pink darken-1" onClick={postImage}>Post</button>
                </form>
            </div>
        </div>
        <div className="container">
            <div className="row">
                <div className="col s12 offset-l4 l5">
                    {
                        url ? <img className="responsive-img" src={url} /> : ''
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
