import {useState, useEffect} from 'react'
import API from '../../services/api'



function PostDetailPage ({postId}) {
    const [post, setPosts] = useState(null)

    const fetchPosts = async () => {
        try {
            const res = await API(`/api/posts/${postId}`)
            console.log(res.data)
            setPosts(res.data)
        } catch (err) {
            console.log(err.response?.data)
        }
    } 
    useEffect(() => {
        fetchPosts()
    }, [postId])

    return (
      <div>
            <h3>{post?.title}</h3>
            <p>{post?.content}</p>
      </div>
    )
}

export default PostDetailPage