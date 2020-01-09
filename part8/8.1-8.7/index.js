const { ApolloServer, gql } = require('apollo-server')
const uuid = require('uuid/v1')

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * It would be more sensible to assosiate book and the author by saving 
 * the author id instead of the name to the book.
 * For simplicity we however save the author name.
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

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

    type Query {
        hello: String!
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
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
        ): String
    }
`

const resolvers = {
    Query: {
        hello: () => { return "world" },
        bookCount: () => books.length,
        authorCount: () => authors.length,
        allBooks: (root, args) => {
            authorArg = args.author? args.author: null
            genreArg = args.genre? args.genre: null
            if (!authorArg && !genreArg) {
                return books
            }
            return books.filter(b => authorArg? b.author === authorArg: b).filter(b => genreArg? b.genres.includes(genreArg): b)
        },
        allAuthors: () => authors
    },
    Author: {
        bookCount: root => {
            return books.filter(b => b.author === root.name).length
        }
    },
    Mutation: {
        addBook: (root, args) => {
            const newBook = {
                title: args.title,
                author: args.author,
                published: args.published,
                genres: args.genres,
                id: uuid()
            }
            if (!authors.includes(args.author)) {
                authors = authors.concat({name: args.author, born: null, id: uuid()})
            }
            books = books.concat(newBook)
            return newBook
        },
        editAuthor: (root, args) => {
            if (!authors.find(a => a.name === args.name)) {
                return null
            }
            const author = authors.find(a => a.name === args.name)
            const updatedAuthor = {...author, born: args.setBornTo}
            authors = authors.map(a => updatedAuthor.name === a.name? updatedAuthor: a)
            return updatedAuthor
        }
    }

}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})