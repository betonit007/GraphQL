import React, { useState, useContext } from 'react'
import { auth, gProvider } from '../../firebase/firebase.utils'
import { AuthContext } from '../../context/authContext'
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import AuthForm from '../../components/forms/AuthForm'

const USER_CREATE = gql`
 mutation userCreate {
     userCreate {
         username
         email
     }
  }
`

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const { login } = useContext(AuthContext)

    let history = useHistory()

    const [userCreate] = useMutation(USER_CREATE)

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
        userCreate()
        history.push('/profile')
    }

    const googleLogin = async () => {
        try {
            const { user } = await auth.signInWithPopup(gProvider)
            const idTokenResult = await user.getIdTokenResult()
            login(user.email, idTokenResult.token)
            userCreate()
            history.push('/profile')

        } catch (error) {
            console.log(error)
            toast.error(error)
        }

    }

    return (
        <div className="container">
            <div className="row m-2">
                {loading ? <h4 className='text-warning'>Loading....</h4> : <h4>Login</h4>}
                <AuthForm
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    loading={loading}
                    handleSubmit={handleSubmit}
                    showPasswordInput={true}
                />
            </div>
            <div className="d-flex flex-column align-items-center">
                <p className='text-center'>Or Login with Google</p>
                <button onClick={googleLogin} style={{ width: "150px" }} className="btn btn-danger"><i className='fa fa-google'></i> Signin</button>
            </div>
            <Link className="text-danger float-right" to='/password/forgot'>Forgot Password</Link>
        </div>
    )
}

export default Login
