const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = req => {
    const auth = req.get('authorization')
    if (auth && auth.toLowerCase().startsWith('bearer')) {
        return auth.substring(7)
    }
    return null
}

blogRouter.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find({}).populate('users', {username: 1, name: 1})
        res.json(blogs.map(blog => blog.toJSON()))
    }
    catch(exception) {
        res.status(404).json({exception: exception.message})
    }
})

blogRouter.post('/', async (req, res) => {
    const body = req.body
    const token = getTokenFrom(req)
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return res.status(401).json({error: "Token missing or invalid"})
        }
        const user = await User.findOne({username: body.username})
        const newblog = new Blog({
            url: body.url,
            title: body.title,
            author: body.author,
            user: user._id
        })
        console.log("Made it till here!")
        const savedblog = await newblog.save()
        user.blogs = user.blogs.concat(savedblog._id)
        await user.save()
        res.json(savedblog.toJSON())
    }
    catch(exception) {
        res.status(401).send({error: exception})
    }
})

blogRouter.delete('/:id', async (req, res) => {
    const token = getTokenFrom(req)
    const blogToDelete = await Blog.findById(req.params.id)
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !(decodedToken.id === blogToDelete.user.toString())) {
            return res.status(404).json({error: "Invalid/Wrong token or User ID mismatch"})
        }
        await Blog.findByIdAndDelete(req.params.id)
        res.status(204).json({message: `Blog with id ${req.params.id} has been deleted`})
    }
    catch(exception) {
        res.status(404).json({error: exception.message})
    }
})

module.exports = blogRouter