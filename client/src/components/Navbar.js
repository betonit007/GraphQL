import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

const Navbar = () => {


  const { user, logout } = useContext(AuthContext)
  let history = useHistory()
  console.log(user)
  return (
    <nav className="navbar navbar-expand-lg navbar-light pl-2 theme-bg">
      <Link to="/" className="navbar-brand">GraphQL</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          {user && 
            <li className="nav-item active d-flex align-items-center">
            <Link className="nav-link" to="/profile">{user.email && user.email.split("@")[0]}</Link>
          </li>
          }
          {!user &&
            <>
              <li className="nav-item active d-flex align-items-center">
                <Link className="nav-link d-flex align-items-center" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link d-flex align-items-center" to='/register'>Register</Link>
              </li>
            </>
          }
          {user &&
            <li
              className="nav-item d-flex align-items-center"
              style={{ cursor: "pointer" }}
            >
              <p className='d-flex align-items-center m-2'
                onClick={() => {
                  logout()
                  history.push('/login')
                }
                }
              >Logout
              </p>
            </li>
          }
        </ul>
        <form className="form-inline my-2 my-lg-0 d-flex pr-2">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>
  )
}

export default Navbar
