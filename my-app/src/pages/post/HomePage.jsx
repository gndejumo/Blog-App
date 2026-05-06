import { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import API from "../../services/api"
import './Home.css'
import Navbar from '../../components/Navbar' 


function HomePage() {
  const [posts, setPosts] = useState([])
  const navigate = useNavigate()
  const user = JSON.parse(sessionStorage.getItem('user')|| 'null')
  const handleDelete = async (postId) => {
    try {
      await API.delete(`/api/posts/${postId}`)
      setPosts(posts.filter(p => p._id !== postId))
    } catch (err) {
      console.log(err.response?.data)
    }
  }



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
    <>
      <Navbar />
      <div className="home-wrapper">
        <div className="home-header">  
          <div>
            <p className="home-eyebrow">Latest posts</p>
            <h1 className="home-title">Your Feed</h1>
          </div>
          <a href="/create" className="btn-new-post">+ New Post</a>
        </div>
        <div className="posts-feed">
          {posts.length === 0 ? (
            <div className="posts-empty">
              <span>No posts yet</span>
              Be the first to write something.
            </div>
          ) : posts.map((post) => (
            <div key={post._id} className="post-card">
              {user && post.author?._id === user._id && (
                <span className="post-badge post-badge--you">You</span>
              )}
              <h2 className="post-card-title">{post.title}</h2>
              <p className="post-card-content">{post.content}</p>
              <div className="post-card-footer">
                {(user?.role === 'admin' || post.author?._id === user?._id) && (
                  <button className="btn-delete" onClick={() => handleDelete(post._id)}>
                    Delete
                  </button>
                )}
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

export default HomePage
