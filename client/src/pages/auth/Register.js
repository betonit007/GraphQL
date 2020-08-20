import React, { useState } from 'react'
import { auth } from '../../firebase/firebase.utils'
import { toast } from 'react-toastify';

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
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            type="email"
                            className='form-control'
                            placeholder="Enter Email"
                            disabled={loading}
                        />
                    </div>
                    <button className="btn btn-raised theme-bg mt-2" disabled={!email || loading}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Register
