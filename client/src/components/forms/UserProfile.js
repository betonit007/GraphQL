import React from 'react'

const UserProfile = ({ handleSubmit, handleChange, fileResizeAndUpload, loading, values: { username, name, email, about } }) => (

    <div className="row">
        <div className="col-md-8 m-auto">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        className='form-control m-2'
                        placeholder='Username'
                        type="text"
                        name="username"
                        value={username}
                        onChange={handleChange}
                        disabled={loading}
                    />
                    <input
                        className='form-control m-2'
                        placeholder='Name'
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleChange}
                        disabled={loading}
                    />
                    <input
                        className='form-control m-2'
                        placeholder='Email'
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        disabled={loading}
                    />
                    <textarea
                        className='form-control m-2'
                        placeholder='About'
                        name="about"
                        value={about}
                        onChange={handleChange}
                        disabled={loading}
                    />

                </div>
                <div>
                    <button className="btn btn-primary m-2" type="submit" disable={!email || !loading}>Submit</button>
                </div>
            </form>
        </div>
    </div >
)


export default UserProfile
