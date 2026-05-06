import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import API from '../../services/api'
import './CreatePost.css'


function CreatePostPage () {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [alert, setAlert] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const handleCreatePost = async (e) => {
        e.preventDefault()
        setLoading(true)
        setAlert(null)
        try {
            const res = await API.post('/api/posts/', {title, content})
            console.log(res.data)
            setAlert({type: 'success', message: "Post Successfully Created"})
            setTimeout(() => navigate('/'), 1500)
        } catch (error) {
            console.log(error.response?.data)
            setAlert({ type: 'error', message: error.response?.data?.message || 'Something went wrong.' })
        } finally {
            setLoading(false)
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
                {alert && (
                    <div className={`alert alert--${alert.type}`}>{alert.message}
                    </div>
                )}
            <button type="submit" className="btn-create" disabled={loading}>
                {loading ? <span className="spinner"/>: 'Create'}</button>
            </div>
        </form>
        </div>
    </div>
    )
}

export default CreatePostPage