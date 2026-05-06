import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import API from '../../services/api'
import Navbar from '../../components/Navbar'

function MyPostPage () {
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()

    const fetchMyPosts = async () => {
        try {
            const res = await API.get('/api/posts/my-posts')
            setPosts(res.data.data)
        } catch (err) {
            console.log(err.response.data)
        }
    }
    useEffect(() => {
        fetchMyPosts()
    }, [])
      return (
    <>
      <Navbar />
      <div className="home-wrapper">
        <div className="home-header">
          <div>
            <p className="home-eyebrow">Your posts</p>
            <h1 className="home-title">My Posts</h1>
          </div>
          <a href="/create" className="btn-new-post">+ New Post</a>
        </div>
        <div className="posts-feed">
          {posts.length === 0 ? (
            <div className="posts-empty">
              <span>No posts yet</span>
              You haven't written anything yet.
            </div>
          ) : posts.map((post) => (
            <div key={post._id} className="post-card">
              <h2 className="post-card-title">{post.title}</h2>
              <p className="post-card-content">{post.content}</p>
              <div className="post-card-footer">
                <button className="btn-read-more" onClick={() => navigate(`/post/${post._id}`)}>
                  Read more
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )

} 


export default MyPostPage