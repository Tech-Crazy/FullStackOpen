const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async(req, res) => {
    try {
        const users = await User.find({}).populate('blogs', {title: 1, author: 1})
        res.json(users.map(user => user.toJSON()))
    }
    catch(exception) {
        res.status(404).json({error: error.message})
    }
})

userRouter.post('/', async (req, res) => {
    try {
        const body = req.body
        const saltRounds = 10
        if (body.password.length < 3) {
            return res.status(401).json({error: "Password must be atleast 3 characters long"})
        }
        const passwordHash = await bcrypt.hash(body.password, saltRounds)
        const newuser = new User({
            username: body.username,
            name: body.name,
            passwordHash
        })
        const saveduser = await newuser.save()
        res.json(saveduser.toJSON())
    }
    catch(exception) {
        res.status(404).json({error: exception.message})
    }
})

module.exports = userRouter