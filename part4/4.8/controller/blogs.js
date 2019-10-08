const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find({})
        res.json(blogs.map(blog => blog.toJSON()))
    }
    catch(exception) {
        res.status(404).json({error: exception.message})
    }
})

blogsRouter.post('/blogs', async (req, res) => {
    const blog = new Blog(req.body)
    try {
        const savedblog = await blog.save()
        res.status(201).json(savedblog.toJSON())
    }
    catch(exception) {
        res.status(400).json({error: exception.message})
    }
})

blogsRouter.delete('/blogs/:id', async (req, res) => {
    const id = req.params.id
    try {
        await Blog.findByIdAndDelete(req.params.id)
        res.status(204).end()
    }
    catch (exception) {
        res.status(401).json({error: exception})
    }
})

blogsRouter.put('/blogs/:id', async (req, res) => {
    const body = req.body
    const updateblog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }
    try {
        const updatedblog = await Blog.findByIdAndUpdate(req.params.id, updateblog, {new: true})
        res.json(updatedblog.toJSON())
    }
    catch (exception) {
        res.status(404).end()
    }
})

module.exports = blogsRouter