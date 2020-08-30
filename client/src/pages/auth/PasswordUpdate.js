import React, { useState } from 'react'
import { auth } from '../../firebase/firebase.utils'
import { toast } from 'react-toastify'
import AuthForm from '../../components/forms/AuthForm'


const PasswordUpdate = () => {
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        try {
            auth.currentUser.updatePassword(password)
            toast.success("Password Updated")

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='container p-5'>
            {loading ?
                (
                    <h4 className='text-danger'>Loading...</h4>
                )
                :
                <AuthForm 
                  password={password}
                  setPassword={setPassword}
                  loading={loading}
                  handleSubmit={handleSubmit}
                  showPasswordInput={true}
                  hideEmailInput={true}
                />
            }

        </div>
    )
}

export default PasswordUpdate
