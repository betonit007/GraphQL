import React, { useState } from 'react'
import { auth } from '../../firebase/firebase.utils'
import { toast } from 'react-toastify';
import AuthForm from '../../components/forms/AuthForm'

const Register = () => {

    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        const config = {
            url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
            handleCodeInApp: true
        }
        await auth.sendSignInLinkToEmail(email, config)
        //show toast notification

        window.localStorage.setItem('emailFormRegistration', email)
        setEmail("")
        setLoading(false)
        toast.info("Registration request sent. Please check your email for link to finalize registration")
    }

    return (
        <div className="container">
            <div className="row m-2">
                {loading ?
                    <div className="spinner-border text-secondary m-2" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    :
                    <h4>Register</h4>
                }
                <AuthForm 
                  email={email}
                  loading={loading}
                  setEmail={setEmail}
                  handleSubmit={handleSubmit}
                />
            </div>
        </div>
    )
}

export default Register
