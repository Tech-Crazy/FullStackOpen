const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log("Provide password as an argument")
    process.exit(1)
}

else {
    
    const password = process.argv[2]
    const url = `mongodb+srv://fullstack:${password}@cluster0-x1lm1.mongodb.net/test?retryWrites=true&w=majority`
    
    mongoose.connect(url, {useNewUrlParser: true})

    const contactSchema = new mongoose.Schema({
        name: String,
        number: String
    })
    
    const Contact = mongoose.model("Contact", contactSchema)
    
    if (process.argv.length === 3) {

        Contact.find({}).then(result => {
            console.log("Phonebook:")
            result.forEach(contact => {
                console.log(contact.name, contact.number)
                mongoose.connection.close()
            })
        })
    }
    else if (process.argv.length > 3) {

        const contact = new Contact({
            name: process.argv[3],
            number: process.argv[4].toString()
        })

        contact.save().then(response => {
            console.log("Contact saved!")
            mongoose.connection.close()
        })
    }
}