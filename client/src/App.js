import React, { useState, useEffect } from 'react'
import ApolloClient from 'apollo-boost'
import { gql } from 'apollo-boost'

const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT
})

const App = () => {

    const [posts, setPosts] = useState([])

    client.query({
        query: gql`
          {
            allPosts {=
                id
                title
                description
            }
          }
        `
    }).then(response => setPosts(response.data.allPosts))

    return (
        <div className='container p-5'>
            <div className='row p-5'>
                {posts.map(p => (
                    <div className="col-md-4">
                        <div className="card">
                            
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default App
