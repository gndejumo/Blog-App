import {useState , useEffect} from 'react'
import API from "../../services/api"


function HomePage () {
  const [posts, setPosts] = useState([])

  const fetchPosts = async () => {
    try {
      const res = await API.get('/api/posts/')
      console.log(res.data.data)
      setPosts(res.data.data)
    } catch (err) {
      console.log(err.response?.data)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div>
      {posts.map((post) => 
      <div key={post._id}>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
      </div>)}
    </div>
  )
}

export default HomePage