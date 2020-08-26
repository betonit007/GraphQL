const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    name: {
        type: String,

    },
    email: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    images: {
        type: Array,
        default: [
            {
                url: 'https://via.placeholder.com/200x200.png?text=No%20Profile%20Image',
                public_id: Date.now //this is built into mongoose.
            }
        ]
    },
    about: {
        type: String
    }
}, { timestamps: true }) //automatic createAt and updatedAt fields

module.exports = mongoose.model('User', userSchema);