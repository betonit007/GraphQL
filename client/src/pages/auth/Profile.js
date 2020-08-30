import React, { useState, useMemo, useContext } from 'react'
import { toast } from 'react-toastify'
import { useQuery, useMutation } from '@apollo/react-hooks'
import omitDeep from 'omit-deep';
import { PROFILE } from '../../graphql/queries'
import { USER_UPDATE } from '../../graphql/mutations'
import { AuthContext } from '../../context/authContext'
import UserProfile from '../../components/forms/UserProfile';
import FileUpload from '../../components/FileUpload';

const Profile = () => {

    const { user } = useContext(AuthContext)

    const [values, setValues] = useState({
        username: '',
        name: '',
        email: '',
        about: '',
        images: []
    })
    //mutation
    const [userUpdate] = useMutation(USER_UPDATE, {
        update: ({ data }) => {
            console.log('USER UPDATE MUTATION IN PROFILE', data)
            toast.success('Profile Updated')
        }
    })

    const { username, name, email, about, images } = values
    const [loading, setLoading] = useState(false)

    const { data } = useQuery(PROFILE)

    useMemo(() => {
        if (data) {

            setValues({
                ...values,
                username: data.profile.username,
                name: data.profile.name,
                email: data.profile.email,
                about: data.profile.about,
                images: omitDeep(data.profile.images, ['__typename'])
            })
        }
    }, [data])

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        userUpdate({ variables: { input: values } })
        setLoading(false)
    }

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

   

    return (
        <div className="container">
                    <UserProfile
                        handleSubmit={handleSubmit}
                        values={values}
                        loading={loading}
                        handleChange={handleChange}
                    />
                    <FileUpload 
                      loading={loading}
                      setLoading={setLoading}
                      values={values}
                      setValues={setValues}
                      user={user}
                    />
            
        </div>
    )
}

export default Profile
