import {useState} from 'react'
import {useNavigate} from 'react-router-dom'


function Navbar() {
  const navigate = useNavigate()
  const [token,setToken] = useState(sessionStorage.getItem('token'))

  const handleLogout = () => {
    sessionStorage.removeItem('token')
    setToken(null)
    navigate('/')
  }

  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">
        KwentoHub<span>.</span>
      </a>
      <div className="navbar-links">
        <a href="/" className="nav-link">Home</a>
        {token ? (
          <>
          <a href="/my-posts" className="nav-link">My Posts</a>
          <button className='nav-btn nav-btn--logout' onClick={handleLogout}>
            Logout
          </button>
          </>
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


export default Navbar