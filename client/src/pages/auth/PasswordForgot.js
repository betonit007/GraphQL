import React, {useState} from 'react'
import {auth} from '../../firebase/firebase.utils'
import {toast} from 'react-toastify'
import AuthForm from '../../components/forms/AuthForm'

const PasswordForgot = () => {
    
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
      e.preventDefault()
      setLoading(true)
      const config = {
        url: process.env.REACT_APP_PASSWORD_FORGOT_REDIRECT,
        handleCodeInApp: true
    }
      try {
        const response = await auth.sendPasswordResetEmail(email, config)
        setEmail("")
        setLoading(false)
        toast.success(`Email is sent to ${email} Click on link to reset your password.`)
      } catch (error) {
          setLoading(false)
          console.log("error on resetting password", error)
      }
     
    }

    return (
        <div className="container p-5">
            {loading ? <h4 className='text-danger'>Loading...</h4> : <h4>Forgot Password</h4>}
            <AuthForm
              email={email}
              setEmail={setEmail}
              loading={loading}
              handleSubmit={handleSubmit}
            />
        </div>
    )
}

export default PasswordForgot
