import {useState , useEffect} from 'react'
import API from "../../services/api"


function HomePage() {
  const [post, setPost] = useState([])

  const fetchPosts = async () => {
    try {
      const res = await API.get('/api/posts/')
      setPost(res.data)
    } catch (err) {
      console.log(err.response?.data)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div>
      {post.map((post) => 
      <div key={post._id}>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
      </div>)}
    </div>
  )
}

export default HomePage