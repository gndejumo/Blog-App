import { useState } from 'react'
import { useNavigate} from 'react-router-dom'
import API from '../../services/api'
import './RegisterPage.css'

function RegisterPage() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      const res = await API.post('/api/auth/register', { firstName, lastName, email, password })
      console.log(res.data)
      navigate('/login')
    } catch (err) {
      console.log(err.response?.data)
    }
  }

  return (
    <div className="register-wrapper">
      <div className="register-card">
        <div className="register-header">
          <p className="register-eyebrow">Get started</p>
          <h1 className="register-title">Create your<br />account</h1>
        </div>
        <form className="register-form" onSubmit={handleRegister}>
          <div className="field-row">
            <div className="field">
              <label>First name</label>
              <input type="text" placeholder="Juan" onChange={e => setFirstName(e.target.value)} />
            </div>
            <div className="field">
              <label>Last name</label>
              <input type="text" placeholder="dela Cruz" onChange={e => setLastName(e.target.value)} />
            </div>
          </div>
          <div className="field">
            <label>Email address</label>
            <input type="email" placeholder="you@example.com" onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" placeholder="••••••••" onChange={e => setPassword(e.target.value)} />
          </div>
          <div className="register-actions">
            <button type="submit" className="btn-register">Create account</button>
          </div>
        </form>
        <div className="register-footer">
          Already have an account? <a href="/login">Sign in</a>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage