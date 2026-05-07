import { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import API from "../../services/api"
import './Home.css'
import Navbar from '../../components/Navbar' 


function HomePage() {
  const [posts, setPosts] = useState([])
  const navigate = useNavigate()
  const [search, setSearch] = useState("")
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


// Filter posts by title OR author name
const filteredPosts = posts.filter((post) => {
  const query = search.toLowerCase().trim()
  if(!query){
    return true
  }
  const titleMatch = post.title?.toLowerCase().includes(query)
  const authorMatch = post.author?.firstName?.toLowerCase().includes(query)
  return titleMatch || authorMatch
})



  return (
    <>
      <Navbar />
      <div className="home-wrapper">
        <div className="home-header">
          <div>
            <p className="home-eyebrow">Latest posts</p>
            <h1 className="home-title">Your Feed</h1>
          </div>
          <div className="header-right">
            <div className="search-input-group">
              <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                className="search-input"
                placeholder="Search by title or author..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button className="search-clear" onClick={() => setSearch("")} aria-label="Clear search">✕</button>
              )}
            </div>
            <a href="/create" className="btn-new-post">+ New Post</a>
          </div>
        </div>

        {search && (
          <p className="search-results-count">
            {filteredPosts.length} result{filteredPosts.length !== 1 ? 's' : ''} for "<strong>{search}</strong>"
          </p>
        )}

        <div className="posts-feed">
          {filteredPosts.length === 0 ? (
            <div className="posts-empty">
              {search ? (
                <>
                  <span>No results found</span>
                  Try a different title or author name.
                </>
              ) : (
                <>
                  <span>No posts yet</span>
                  Be the first to write something.
                </>
              )}
            </div>
          ) : filteredPosts.map((post) => (
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
