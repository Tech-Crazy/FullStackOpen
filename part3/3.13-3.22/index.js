require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Contact = require('./models/contact')

const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))

app.get("/api/persons", (req, res) => {
    Contact.find({})
    .then(results => {
        res.json(results.map(result => result.toJSON()))
    })
})

app.get("/info", (req, res) => {
    const current = new Date()
    Contact.count({})
    .then(count => {
        res.send(`<p>Phonebook has info for ${count} people</p><p>${current.toUTCString() + current.getTimezoneOffset()}</p>`)
    })
})

app.get("/api/persons/:id", (req, res) => {
    Contact.findById(req.params.id, (error, contact) => {
        if (error) {
            console.log("An error occured. Details: ", error)
            res.status(404).end()
        }
        else {
            res.json(contact.toJSON())
        }
    })
})

app.delete("/api/persons/:id", (req, res) => {
    const id = req.params.id
    Contact.findByIdAndDelete(id, (error, data) => {
        if (error) {
            console.log("Error has occured. Details: ", error)
        }
        else {
            console.log(`Object with ID ${id} has been removed`)
            res.status(204).end()
        }
    })
})


app.post("/api/persons", (req, res) => {
    const body = req.body
    if (!body.name || !body.number) {
        return res.status(404).json({
            error: "Name and number have to be provided"
        })
    }
    else{
        const contact = new Contact({
            name: body.name,
            number: body.number
        })
        contact.save().then(savedContact => {
            res.json(savedContact.toJSON())
        })
        .catch(error => {
            console.log("An error has occured. Details: ", error.message)
            res.status(400).json(error)
        })
    }
})

const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})