import {useState} from 'react';
import API from '../../services/api'

function LoginPage (){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const res = await API.post('/api/auth/login', {email, password})
            console.log(res.data)
        } catch (err) {
            console.log(err.response.data)
        }
    }
        return (
        <form onSubmit={handleLogin}>
            <input type="email" onChange={e => setEmail(e.target.value)}placeholder="Enter Email"/>
            <input type="password" onChange={e => setPassword(e.target.value)}placeholder="Enter Password"/>
            <button type="submit">Login</button>
        </form>
    )
}


export default LoginPage