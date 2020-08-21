import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

const Navbar = () => {


  const { user, logout } = useContext(AuthContext)
  let history = useHistory()

  return (
    <nav className="navbar navbar-expand-lg navbar-light pl-2 theme-bg">
      <Link to="/" className="navbar-brand">GraphQL</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          {!user &&
            <>
              <li className="nav-item active">
                <Link className="nav-link" to="/login">Login<span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/register'>Register</Link>
              </li>
            </>
          }
          {user &&
            <li
              className="nav-item"
              style={{ cursor: "pointer" }}
            >
              <p
                onClick={() => {
                  logout()
                  history.push('/login')
                }
                }
                className="nav-link">Logout</p>
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
