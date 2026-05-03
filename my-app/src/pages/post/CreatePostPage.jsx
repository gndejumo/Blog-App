import {useState} from 'react'
import API from '../../services/api'


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
        <form onSubmit={handleCreatePost}>
            <input type="text" onChange={e => setTitle(e.target.value)} placeholder="Enter Title"/>
            <textarea onChange={e => setContent(e.target.value)} placeholder="Enter Content"/>
            <button type="submit">Create</button>
        </form>
    )
}

export default CreatePostPage