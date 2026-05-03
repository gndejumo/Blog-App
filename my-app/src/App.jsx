import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import CreatePostPage from './pages/post/CreatePostPage'
import HomePage from './pages/post/HomePage'
import PostDetailPage from './pages/post/PostDetailPage'
import ProfilePage from './pages/user/ProfilePage'


function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element= {<HomePage/>}/>,
        <Route path="/login" element={<LoginPage/>}/>,
        <Route path="/register" element= {<RegisterPage/>}/>,
        <Route path="/create" element={<CreatePostPage/>}/>,
        <Route path="/post/:id" element={<PostDetailPage/>}/>,
        <Route path="/profile/:id" element={<ProfilePage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App

