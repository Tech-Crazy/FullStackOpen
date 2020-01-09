const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/Book')
const Author = require('./models/Author')
const User = require('./models/User')
const jwt = require('jsonwebtoken')

const APP_SECRET = "some_mysterious_value"

const MONGODB_URI = `mongodb+srv://admin:admin@cluster0-ebxms.mongodb.net/test?retryWrites=true&w=majority`

console.log(`Connecting to ${MONGODB_URI}`)

mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(async () => {
    console.log("Connected to MongoDB")
    const authors = await Author.collection.find({})
    console.log(authors)
})
.catch((error) => console.log(`Error connecting to MongoDB: ${error.message}`))

const typeDefs = gql`
    type Book {
        title: String!
        author: String!
        published: Int
        genres: [String!]!
    }

    type Author {
        name: String!
        born: Int
        bookCount: Int!
    }

    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }

    type Token {
        value: String!
    }

    type Query {
        hello: String!
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
        me: User
    }

    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int!
            genres: [String!]!
        ): Book
        editAuthor(
            name: String!
            setBornTo: Int!
        ): Author
        login(
            username: String!
            password: String!
        ): Token
    }
`

const resolvers = {
    Query: {
        hello: () => { return "world" },
        bookCount: () => Book.countDocuments({}),
        authorCount: () => Author.countDocuments({}),
        allBooks: (root, args) => {
            authorArg = args.author? args.author: null
            genreArg = args.genre? args.genre: null
            if (!authorArg && !genreArg) {
                return Book.find({})
            }
            //return books.filter(b => authorArg? b.author === authorArg: b).filter(b => genreArg? b.genres.includes(genreArg): b)
            return Book.find({author: Author.find({name: args.author})._id})
        },
        allAuthors: () => Author.find({})
    },
    Author: {
        bookCount: root => {
            //return books.filter(b => b.author === root.name).length
            return Book.find({author: root.name}).countDocuments()
        }
    },
    Mutation: {
        addBook: async (root, args, context) => {
            const currentUser = context.currentUser
            
            if (!currentUser) {
                throw new AuthenticationError("Not authenticated")
            }

            const newBook = new Book({
                title: args.title,
                author: args.author,
                published: args.published,
                genres: args.genres,
            })
            const authors = await Author.find({})
            if (!authors.find(a => a.name === args.author)) {
                const newAuthor = new Author({name: args.author})
                await newAuthor.save()
            }

            return newBook.save()
        },
        editAuthor: async (root, args, context) => {
            const currentUser = context.currentUser
            
            if (!currentUser) {
                throw new AuthenticationError("Not authenticated")
            }

            await Author.updateOne({name: args.name}, {born: args.setBornTo})
            return Author.find({name: args.name})
        },
        login: async (root, args) => {
            const user = await User.find({username: args.username})
            if (!user && args.password !== "secretpassword") {
                throw new UserInputError({
                    invalidArgs: args,
                })
            }
            const userForToken = {
                username: user.username,
                id: user._id
            }
            return { value: jwt.sign(userForToken, APP_SECRET)}
        }
    }

}


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({req}) => {
      const auth = req? req.headers.authorization: null
      if (auth && auth.toLowerCase().startsWith('bearer')) {
          var decodedToken = jwt.verify(auth.substring(7), APP_SECRET)
      }
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
  },
  cors: true
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})