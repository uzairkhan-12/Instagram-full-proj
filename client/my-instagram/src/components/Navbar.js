import react from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import setLogout from '../redux/features/userSlice'
function Navbar() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.User.activeUser)
  const navigate = useNavigate()


  const logOut = () => {
    localStorage.removeItem('jwt')
    localStorage.removeItem('user')
    dispatch(setLogout())
    navigate('/login')
  }
  const renderList = () => {
    if (user) {
      return (<div>
        <Link to="/" className="brand-logo left">Instagram</Link>
        <ul key='nav-mobile' id="nav-mobile" className="right hide-on-med-and-down">
          <li key='createpost'><Link to="/createpost">Create post</Link></li>
          <li key='profile'><Link to="/profile">Profile</Link></li>
          {/* <li key='profile'><Link onClick={logOut}>Logout</Link></li> */}
          <li><Link onClick={logOut} to='login'>Log out</Link></li>
        </ul>
      </div>
      )
    }
    else {
      return (
        <ul key='nav-mobile' id="nav-mobile" className="right hide-on-med-and-down">
          <li key='login'><Link to="/login">Login</Link></li>
          <li key='signup'><Link to="/signup">Signup</Link></li>
        </ul>
      )
    }
  }


  return (
    <>
      <nav key='nav'>
        <div key='nav-wrapper' className="nav-wrapper white">
          {/* <Link to="/" className="brand-logo left">Instagram</Link> */}
          {renderList()}
          {/* <ul id="nav-mobile" className="right hide-on-med-and-down">
        
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
        <li><Link to="/createpost">Create post</Link></li>
        <li><Link to="/profile">Profile</Link></li>

      </ul> */}
        </div>
      </nav>
    </>
  )
}

export default Navbar