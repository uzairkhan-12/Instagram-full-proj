import './App.css';
import React, { useEffect } from 'react'
import Navbar from './components/Navbar';
import { Routes , Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Home from './components/screens/Home';
import Profile from './components/screens/Profile'
import Signup from './components/screens/Signup';
import Login from './components/screens/Login'
import CreatePost from './components/screens/CreatePost'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveUser } from './redux/features/userSlice'
import UserProfile from './components/screens/UserProfile';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      dispatch(setActiveUser(user))
      // navigate('/')
    } 
     else {
        navigate('/login')
     }
  }, [])
  return (
    <div className="App">
    
    <Routes>
    <Route  path="/" element={<Home/>}/>
    <Route  path="/login" element={<Login/>}/>
    <Route path="/signup" element={<Signup />} />
    <Route exact path='/profile' element={<Profile />} />
    <Route path='/createpost' element={<CreatePost />} />
    <Route path='/profile/:userid' element={<UserProfile />} />
    </Routes>
    </div>
  );
}

export default App;