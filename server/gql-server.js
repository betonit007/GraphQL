const { ApolloServer } = require('apollo-server')
require('dotenv').config()

// types (query / mutation / subscription)
const typeDefs = `
  type Query {
      totalPosts: Int!
  }
`
// resolvers (return data to client)
const resolvers = {
  Query: {
      totalPosts: () => 42
  }
}

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
})


apolloServer.listen(process.env.PORT, () => {
    console.log(`GraphQL server listening on port ${process.env.PORT}`)
})