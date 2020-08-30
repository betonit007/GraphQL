import React, { useContext } from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Register from './pages/auth/Register'
import CompleteRegistration from './pages/auth/CompleteRegistration'
import { AuthContext } from './context/authContext'
import Login from './pages/auth/Login'
import { Switch, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import PrivateRoute from './components/PrivateRoute'
import PasswordUpdate from './pages/auth/PasswordUpdate'
import Post from './pages/posts/Post'
import Profile from './pages/auth/Profile'
import PasswordForgot from './pages/auth/PasswordForgot'

import 'react-toastify/dist/ReactToastify.css'

const App = () => {

    const client = new ApolloClient({
        uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
        request: operation => {
            operation.setContext({
                headers: {
                    authtoken: user ? user.token : ""
                }
            })
        }
    })

    const { user } = useContext(AuthContext)
    return (
        <ApolloProvider client={client}>
            <Navbar />
            <ToastContainer
                position="top-center"
                autoClose={5000}
            />
            <Switch >
                <Route exact path="/" component={Home} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/password/forgot' component={PasswordForgot} />
                <Route exact path='/complete-registration' component={CompleteRegistration} />
                <PrivateRoute exact path='/password/update' component={PasswordUpdate} />
                <PrivateRoute exact path='/profile' component={Profile} />
                <PrivateRoute exact path='/post/create' component={Post} />
            </Switch>
        </ApolloProvider>
    )
}

export default App
