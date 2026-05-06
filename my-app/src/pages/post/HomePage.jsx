import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import API from "../../services/api"
import './Home.css'

function Navbar() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">
        thread<span>.</span>
      </a>
      <div className="navbar-links">
        <a href="/" className="nav-link">Home</a>
        {token ? (
          <button className='nav-btn nav-btn--logout' onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
          <a href="/login" className="nav-link">Login</a>
          <a href="/register" className="nav-btn">Register</a>
          </>
      )}
      </div>
    </nav>
  )
}

function HomePage() {
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
              <h2 className="post-card-title">{post.title}</h2>
              <p className="post-card-content">{post.content}</p>
              <div className="post-card-footer">
                <button className="btn-read-more">Read more</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default HomePage
