import './App.css';
import Navbar from './components/Navbar';
import { Routes , Route, BrowserRouter } from 'react-router-dom';
import Home from './components/screens/Home';
import Profile from './components/screens/Profile'
import Signup from './components/screens/Signup';
import Login from './components/screens/Login'
import CreatePost from './components/screens/CreatePost'
function App() {
  return (
    <div className="App">
    
    <Routes>
    <Route  path="/" element={<Home/>}/>
    <Route  path="/login" element={<Login/>}/>
    <Route path="/signup" element={<Signup />} />
    <Route path='/profile' element={<Profile />} />
    <Route path='/createpost' element={<CreatePost />} />
    </Routes>
    </div>
  );
}

export default App;
