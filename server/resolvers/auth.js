const { gql } = require('apollo-server-express')
const shortid = require('shortid')
const { authCheck } = require('../helpers/auth')
const User = require('../models/user')


const userCreate = async (parent, args, { req }) => {
    console.log("userCreate run")
    try {
        const currentUser = await authCheck(req);
        const user = await User.findOne({ email: currentUser ? currentUser.email : "" });
        return user
            ? user
            : new User({
                email: currentUser.email,
                username: shortid.generate()
            }).save();

    } catch (error) {
        console.log(error)
        return error
    }

};

module.exports = {

    Mutation: {
        userCreate
    }
}