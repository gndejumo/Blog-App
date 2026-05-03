import {useState, useEffect} from 'react'
import API from '../../services/api'


function ProfilePage ({userId}) {
    const [posts, setPosts] = useState([]);
    const fetchPosts = async () => {
        try {
            const res = await API.get(`/api/users/profile/${userId}`)
            setPosts(res.data?.data)
            console.log(res?.data)
        } catch (err) {
            console.log(err.response?.data)
        }
    }
    useEffect(() => {
        fetchPosts()
    }, [userId])

    return (
        <div>
            <div>
                <h2>My Profile</h2>
                <p>User id: {userId}</p>
            </div>
            <div>
                <h2>My Post</h2>
                {posts.map((post) => <div key={post._id}>
                    <h3>{post.title}</h3>
                    <h4>{post.content}</h4>
                </div>)}
            </div>
        </div>
    )
}

export default ProfilePage