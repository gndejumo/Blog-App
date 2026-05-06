import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import API from '../../services/api';
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true)
    setAlert(null) 
    try {
      const res = await API.post('/api/auth/login', { email, password });
      sessionStorage.setItem('token', res.data.token)
      sessionStorage.setItem('user', JSON.stringify(res.data.user))
      console.log(res.data);
      setAlert({type: 'success', message: 'Login Successful! Redirecting...'})
      setTimeout(() => navigate('/'), 1500)
    } catch (err) {
      setAlert({ type: 'error', message: err.response?.data?.message || 'Something went wrong.' })
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-header">
          <p className="login-eyebrow">Welcome back</p>
          <h1 className="login-title">Sign in to<br />your account</h1>
        </div>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="field">
            <label htmlFor="email">Email address</label>
            <input id="email" type="email" placeholder="you@example.com"
              onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" placeholder="••••••••"
              onChange={e => setPassword(e.target.value)} />
          </div>
          <div className="login-actions">
            {alert && (<div className={`alert alert--${alert.type}`}>{alert.message}
            </div>)}
            <button type="submit" className="btn-login" disabled={loading}>
            {loading ? <span className="spinner" /> : 'Continue'} 
            </button>
          </div>
        </form>
        <div className="login-footer">
          No account? <a href="/register">Create one</a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;