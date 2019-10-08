const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const Blog = require("../models/blog")

const api = supertest(app)

const initialBlogs = [
    {
        title: "Learning react native",
        author: "Abhishek Prashant",
        url: "http://ashu.com",
        likes: 10
    },
    {
        title: "Decoding enigma",
        author: "Alan Turing",
        url: "http://alanturing.com",
        likes: 1000
    }
]

const toBeAdded = {
    title: "Temporary blog title",
    author: "Blade runner",
    url: "http://test.com",
    likes: 20
}

beforeEach(async () => {
    await Blog.deleteMany({})
    const promiseBlogs = initialBlogs.map(blog => new Blog(blog))
    await Promise.all(promiseBlogs.map(blog => blog.save()))
})

test("blogs returned as json", async () => {
    await api.get('/api/blogs')
            .expect(200)
            .expect("Content-Type", /application\/json/)
})

test("number of entries in the test database", async () => {
    const blogEntries = await api.get('/api/blogs')
    expect(blogEntries.body.length).toBe(initialBlogs.length)
})

test("blogs have a unique identifier id", async () => {
    const blogs = await Blog.find({})
    blogs.forEach(blog => expect(blog.toJSON().id).toBeDefined())
})

test("blogs are getting added", async () => {
    const newblog = new Blog(toBeAdded)
    await newblog.save()
    const allblogs = await Blog.find({})
    expect(allblogs.length).toBe(initialBlogs.length+1)
})

afterAll(() => {
    mongoose.connection.close()
})