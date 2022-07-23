import React,{useRef , useEffect , useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import setLogout from '../redux/features/userSlice'
import M from 'materialize-css'
function Navbar() {
  const searchModal = useRef(null)
  const dispatch = useDispatch()
  const user = useSelector(state => state.User.activeUser)
 // console.log(user)
  const navigate = useNavigate()
  const [search , setSearch] = useState("")
  const [userDetails , setUserDetails] = useState([])
  useEffect(() => {
    M.Modal.init(searchModal.current)
  },[])

  const fetchUsers = (query) => {
    setSearch(query)
    fetch('http://localhost:5000/search-user',{
      method:"post",
      headers:{
        "Content-Type":"Application/json"
      },
      body:JSON.stringify({
        query
      })
    }).then(res=> res.json())
    .then(result => {
      // console.log(result)
      setUserDetails(result.user)
    })
}

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
          <li key='search'> <i data-target="modal1" className="large material-icons modal-trigger" style={{color:"black"}}>search</i></li>
          <li key='createpost'><Link to="/createpost">Create post</Link></li>
          <li key='profile'><Link to="/profile">Profile</Link></li>
          <li key='my-following-posts'><Link to="/my-following-posts">My following posts</Link></li>
          {/* <li key='profile'><Link onClick={logOut}>Logout</Link></li> */}
          <li><Link onClick={logOut} to='/login'>Log out</Link></li>
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
        <div id="modal1" className='modal' ref={searchModal}>
<div className='modal-content' style={{color:"black"}}>
<input
            type="text"
            placeholder="search users"
            value={search}
            onChange={(e)=>fetchUsers(e.target.value)}
            />
<div className="collection">
        {userDetails.map(item => {
         return <Link to={item._id !== user._id ?  "/profile/"+item._id:'/profile'} 
         onClick={() => {
            M.Modal.getInstance(searchModal.current).close()
           setSearch('')
          }}
        ><li className="collection-item">{item.email}</li></Link>
        })}
      </div>
</div>
<div className='modal-footer'>
<button className='modal-close waves-effect waves-green btn-flat' onClick={() => {setSearch("")}}>Close</button>
</div>
        </div>
      </nav>
    </>
  )
}

export default Navbar