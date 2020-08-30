import React, { useState, useEffect, useContext } from 'react'
import { auth } from '../../firebase/firebase.utils'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
import { useMutation } from '@apollo/react-hooks'
import {gql} from 'apollo-boost'
import AuthForm from '../../components/forms/AuthForm'

const USER_CREATE = gql`
 mutation userCreate {
     userCreate {
         username
         email
     }
  }
`

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
                userCreate()
                history.push('/profile')
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

    const [userCreate] = useMutation(USER_CREATE)

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
        </div>
    )
}

export default CompleteRegistration
