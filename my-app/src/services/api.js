import axios from 'axios'


const API = axios.create({
    baseURL: "https://blog-application-5s3r.onrender.com"
})

API.interceptors.request.use(config => {
    const token = sessionStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    console.log(config)
    return config
})



export default API;