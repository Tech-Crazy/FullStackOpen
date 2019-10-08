const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        minlength: 3,
        validate: {
            validator: function(v) {
                return /[a-z0-9]+/.test(v)
            },
            message: props => `${props.value} is not a valid username`
        }
    },
    name: String,
    passwordHash: {
        type: String,
        required: true,
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
})

UserSchema.plugin(uniqueValidator)

UserSchema.set('toJSON', {
    transform: (document, returnedObj) => {
        returnedObj.id = returnedObj._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
        delete returnedObj.passwordHash
    }
})

const User = mongoose.model("User", UserSchema)

module.exports = User