import React, { useContext } from 'react'
import ApolloClient from 'apollo-boost'
import { gql } from 'apollo-boost'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import { AuthContext } from '../context/authContext'
import { useHistory } from 'react-router-dom'

const GET_ALL_POSTS = gql`
  {
      allPosts {
          id
          title
          description
      }
  }
`

const Home = () => {

    const { data, loading, error } = useQuery(GET_ALL_POSTS)
    const [fetchPosts, { data: posts }] = useLazyQuery(GET_ALL_POSTS)

    const { user, updateUserName } = useContext(AuthContext)

    //react router
    let history = useHistory()
    
    if (loading) return <div className="p-5">Loading...</div>

    return (
        <div className='container p-5'>
            <div className='row p-5'>
                {data.allPosts.map(post => (
                    <div className="col-md-4" key={post.id}>
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">
                                    <h4>{post.title}</h4>
                                </div>
                                <div className="card-text">
                                    <p>{post.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="p-5 row">
                <hr />
                <button onClick={() => fetchPosts()} className='btn btn-primary'>Fetch Posts</button>
            </div>
            <hr/>
            {user}
            <button className="btn btn-primary" onClick={updateUserName}>Change user name</button>
            {JSON.stringify(history)}
        </div>
    )
}

export default Home
