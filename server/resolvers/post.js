const { gql } = require('apollo-server-express')
const { posts } = require('../temp')

//queries
const totalPosts = () => posts.length
const allPosts = () => posts

//mutation
const newPost = (parent, args) => { //must have at least two args passed in.
    console.log(args)
    // create a new post object
    const post = {
        id: posts.length + 1,
        // title: args.input.title,
        // description: args.input.description
        ...args.input //spread operator does the same as above
    }
    // push new post object to post array
    posts.push(post)
    return post
}

module.exports = {
    Query: {
       totalPosts,
       allPosts
    },
    Mutation: {
        newPost
    }
  }