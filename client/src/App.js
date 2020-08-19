import React, { useState, useEffect } from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import { Switch, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT
})

const App = () => {

    return (
        <ApolloProvider client={client}>
            <Navbar />
            <ToastContainer
                position="top-center"
                autoClose={4000}
            />
            <Switch >
                <Home exact path="/" component={Home} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
            </Switch>
        </ApolloProvider>
    )
}

export default App
