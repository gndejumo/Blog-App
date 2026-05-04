import {useState} from 'react'
import API from '../../services/api'
import './CreatePost.css'


function CreatePostPage () {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const handleCreatePost = async (e) => {
        e.preventDefault()
        try {
            const res = await API.post('/api/posts/', {title, content})
            console.log(res.data)
        } catch (error) {
            console.log(error.response?.data)
        }
    }



    return (
    <div className="createpost-wrapper">
        <div className="createpost-card">
        <div className="createpost-header">
            <p className="createpost-eyebrow">Share your story</p>
            <h1 className="createpost-title">Create a new post</h1>
        </div>
        <form className="createpost-form" onSubmit={handleCreatePost}>
            <div className="field">
            <label>Title</label>
            <input type="text" placeholder="Enter Title" onChange={e => setTitle(e.target.value)} />
            </div>
            <div className="field">
            <label>Content</label>
            <textarea placeholder="Enter Content" onChange={e => setContent(e.target.value)} />
            </div>
            <div className="createpost-actions">
            <button type="submit" className="btn-create">Create</button>
            </div>
        </form>
        </div>
    </div>
    )
}

export default CreatePostPage