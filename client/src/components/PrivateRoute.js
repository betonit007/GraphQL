import React, { useState, useContext, useEffect } from 'react'
import { Route, Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

const PrivateRoute = ({ children, ...rest }) => { // and rest of props other than children componets

    const { user } = useContext(AuthContext)
    const [currentUser, setCurrentUser] = useState(false)

    useEffect(() => {
        if (user) {
            setCurrentUser(true)
        }
    }, [user])

    const navLinks = () => (
        <nav>
            <ul className="nav d-flex">
                <li className="nav-item">
                    <Link className='nav-link' to='/profile'>
                        Profile
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className='nav-link' to='/password/update'>
                        Password
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className='nav-link' to='/post/create'>
                        Post
                    </Link>
                </li>
            </ul>
        </nav>
    )

    const renderContent = () => (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    {navLinks()}
                </div>
            </div>
            <div className="row">
                <Route {...rest} />
            </div>
        </div>
    )
    return currentUser ? renderContent() : <h4>Loading...</h4>
}

export default PrivateRoute;
