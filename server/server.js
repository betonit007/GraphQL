const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const http = require('http')
const path = require('path')
const mongoose = require('mongoose')
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');
const { loadFilesSync } = require('@graphql-tools/load-files');
const { authCheck } = require('./helpers/auth')

require('dotenv').config()

const app = express()

//connect to mongo db
const db = async () => {
    try {
        const success = await mongoose.connect(process.env.MONGO_URI, {
           useNewUrlParser: true,
           useUnifiedTopology: true,
           useCreateIndex: true,
           useFindAndModify: false 
        })
        console.log(`Mongo DB connected!`)
    } catch (err) {
        console.log(err)
    }
}
//call database connection function
db();

const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, './typeDefs')))

const resolvers = mergeResolvers(loadFilesSync(path.join(__dirname, './resolvers')))

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req, res}) => ({req, res})
})

//applyMiddleware method connects ApolloServer to a specific HTTP framework
apolloServer.applyMiddleware({ app })

// server
//now our server can be used with REST and Apolloserver methods (combined)
const httpserver = http.createServer(app)

app.get('/rest', authCheck, (req, res) => {
    res.json({hi: "there"})
})

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`)
    console.log(`GraphQL server is ready at http://localhost:${process.env.PORT}${apolloServer.graphqlPath}`)
})