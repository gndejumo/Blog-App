import {useState} from 'react'
import API from '../../services/api'

function RegisterPage () {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            const res = await API.post('/api/auth/register', {firstName, 
                lastName, email, password
            })
            console.log(res.data)
        } catch (err) {
            console.log(err.response?.data)
        }
    }
    return (
        <form onSubmit={handleRegister}>
            <input type="text" onChange={e => setFirstName(e.target.value)} placeholder= "First Name"/>
            <input type="text" onChange={e => setLastName(e.target.value)} placeholder= "Last Name"/>
            <input type="email" onChange={e => setEmail(e.target.value)} placeholder= "Email"/>
            <input type="password" onChange={e => setPassword(e.target.value)} placeholder= "Password"/>
            <button type="submit">Register</button>
        </form>
    )

}

export default RegisterPage