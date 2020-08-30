import React from 'react'

const AuthForm = ({ email = '', password = '', loading, setEmail = f => f, setPassword, handleSubmit, showPasswordInput = false, hideEmailInput = false }) => (

    <form onSubmit={handleSubmit}>
        <div className="form-group">
            {!hideEmailInput &&

                <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="email"
                    className='form-control'
                    placeholder="Enter Email"
                    disabled={loading}
                />
            }

            {
                showPasswordInput && <input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    className='form-control mt-2'
                    placeholder="Enter Password"
                    disabled={loading}
                />
            }
        </div>
        <button className="btn btn-raised theme-bg mt-2" disabled={!email || loading}>Submit</button>
    </form>
)

export default AuthForm
