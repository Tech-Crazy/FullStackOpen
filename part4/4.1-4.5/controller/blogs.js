const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/blogs', (req, res) => {
    Blog.find({})
    .then(blogs => res.json(blogs.map(blog => blog.toJSON())))
    .catch((error) => res.status(404).json({error: error.message}))
})

blogsRouter.post('/blogs', (req, res) => {
    const blog = new Blog(req.body)
    blog.save()
    .then(result => res.status(201).json(result))
    .catch(error => res.status(400).json({error: error.message}))
})

module.exports = blogsRouter