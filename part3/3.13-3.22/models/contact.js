const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGO_URI

console.log('Connecting to Mongo URI')

mongoose.connect(url, {useNewUrlParser: true})
.then(result => console.log("Connected to MongoDB"))
.catch(error => {
    console.log(error)
    console.log("Error connecting to MongoDB")
})

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, minLength: 3},
    number: { type: String, required: true, unique: true, minlength: 8}
})
contactSchema.plugin(uniqueValidator)

contactSchema.set('toJSON', {
    transform: (document, returnedObj) => {
        returnedObj.id = returnedObj._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
    }
})

module.exports = mongoose.model("Contact", contactSchema)