import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import API from '../../services/api'
import './PostDetail.css'

function PostDetailPage() {
  const { id } = useParams()           
  const navigate = useNavigate()
  const [post, setPost] = useState(null)  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchPost = async () => {
    try {
      const res = await API.get(`/api/posts/${id}`)
      console.log(res.data)
      setPost(res.data)
    } catch (err) {
      setError('Post not found.')
      console.log(err.response?.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPost()
  }, [id])

  return (
    <>
      <Navbar />
      <div className="detail-wrapper">
        <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

        {loading && (
          <div className="detail-state">Loading...</div>
        )}

        {error && (
          <div className="detail-state detail-state--error">{error}</div>
        )}

        {post && (
          <div className="detail-card">
            <p className="home-eyebrow">Post</p>
            <h1 className="detail-title">{post.title}</h1>
            <div className="detail-meta">
              <div className="detail-avatar">
                {post.author?.firstName?.[0]?.toUpperCase() ?? 'U'}
              </div>
              <div className="detail-meta-info">
                <span className="detail-author">{post.author? `${post.author.firstName} ${post.author.lastName}`: 'Unknown'}</span>
                <span className="detail-date">
                  {new Date(post.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'long', day: 'numeric'
                  })}
                </span>
              </div>
            </div>
            <p className="detail-content">{post.content}</p>
          </div>
        )}
      </div>
    </>
  )
}

export default PostDetailPage