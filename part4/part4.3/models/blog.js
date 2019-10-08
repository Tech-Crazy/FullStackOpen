const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    url: String,
    title: String,
    author: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

blogSchema.set('onJSON', {
    transform: (document, returnedObj) => {
        returnedObj.id = returnedObj._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
    }
})

const Blog = mongoose.model("Blog", blogSchema)

module.exports = Blog