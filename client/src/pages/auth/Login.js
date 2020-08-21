import React, { useState, useContext } from 'react'
import { auth, gProvider } from '../../firebase/firebase.utils'
import { AuthContext } from '../../context/authContext'
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const { login } = useContext(AuthContext)

    let history = useHistory()

    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        try {
            const { user } = await auth.signInWithEmailAndPassword(email, password)
            const idTokenResult = await user.getIdTokenResult()
            login(user.email, idTokenResult.token)
        }

        catch (err) {
            console.log('login error', err)
            toast.error(err.message)
        }

        //send user info to our server (mongoDB)
        history.push('/')
    }

    const googleLogin = async () => {
        try {
            const { user } = await auth.signInWithPopup(gProvider)
            const idTokenResult = await user.getIdTokenResult()
            login(user.email, idTokenResult.token)
            history.push('/')
            
        } catch (error) {
            console.log(error)
            toast.error(error)
        }
       
    }

    return (
        <div className="container">
            <div className="row m-2">
                {loading ? <h4 className='text-warning'>Loading....</h4> : <h4>Login</h4>}
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
                        <input
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                            className='form-control mt-2'
                            placeholder="Enter Password"
                            disabled={loading}
                        />
                    </div>
                    <button className="btn btn-raised theme-bg mt-2" disabled={!email || loading || !password}>Submit</button>
                </form>
            </div>
            <div className="d-flex flex-column align-items-center">
                <p className='text-center'>Or Login with Google</p>
                <button onClick={googleLogin} style={{width: "150px"}} className="btn btn-danger"><i className='fa fa-google'></i> Signin</button>
            </div>
        </div>
    )
}

export default Login
