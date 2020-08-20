import React, { useState, useEffect, useContext } from 'react'
import { auth } from '../../firebase/firebase.utils'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'

const CompleteRegistration = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const {completeUserRegistration} = useContext(AuthContext)

    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        
        //check for email and password
        if(!email || !password) {
            toast.error("Email and password are required")
            setLoading(false)
            return
        }
        try {

            const result = await auth.signInWithEmailLink(email, window.location.href)
            if(result.user.emailVerified) {
                completeUserRegistration(password)
                history.push('/')
            }
             
        } catch (err) {
            console.log('register complete error', err.message)
            setLoading(false)
            toast.error(err.message)
        }
    }

    let history = useHistory()

    useEffect(() => {
      setEmail(localStorage.getItem("emailFormRegistration"))
    }, [history])

    return (

        <div className="container">
            <div className="row m-2">
                {loading ?
                    <div className="spinner-border text-secondary m-2" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    :
                    <h4>Complete Registration</h4>
                }
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            type="email"
                            className='form-control mb-2'
                            placeholder="Enter Email"
                            disabled
                        />
                        <input
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                            className='form-control'
                            placeholder="Enter Password"
                            disabled={loading}
                        />
                    </div>
                    <button className="btn btn-raised theme-bg mt-2" disabled={!email || loading}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default CompleteRegistration
