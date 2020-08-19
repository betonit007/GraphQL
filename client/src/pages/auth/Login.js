import React, { useState } from 'react'
import { auth } from '../../firebase/firebase.utils'

const style={
    top: "50vh"
}

const Login = () => {

    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(true)

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
    }

    return (
            <div className="container">
                <div className="row">
                    {loading ? <h4 className='text-warning'>Loading....</h4>:<h4>Login</h4>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="">Email Address</label>
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

export default Login
