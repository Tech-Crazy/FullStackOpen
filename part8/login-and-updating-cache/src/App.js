import React, { useState } from 'react';
import { gql } from 'apollo-boost'
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'


const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

const ALL_AUTHORS = gql`
{
  allAuthors {
    name
    born
    bookCount
  }
}
`

const ALL_BOOKS = gql`
{
  allBooks {
    title
    author
    published
    genres
  }
}
`

const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook (
    title: $title
    author: $author
    published: $published
    genres: $genres
  ) {
    title
    author
    published
    genres
  }
}
`

const UPDATE_YEAR = gql`
mutation editYear($name: String!, $setBornTo: Int!) {
  editAuthor(
    name: $name
    setBornTo: $setBornTo
  ) {
    name
    born
  }
}
`

function App() {
  const client = useApolloClient()

  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')

  const allAuthors = useQuery(ALL_AUTHORS)
  const allBooks = useQuery(ALL_BOOKS)

  const [addBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{query: ALL_BOOKS}],
    update: (store, response) => {
      const dataInStore = store.readQuery({query: 'ALL_BOOKS'})
      dataInStore.allBooks.push(response.data.addBook)
      store.writeQuery({
        query: ALL_BOOKS,
        data: dataInStore
      })
    }
  })
  const [editAuthor] = useMutation(UPDATE_YEAR, {
    refetchQueries: [{query: ALL_AUTHORS}]
  })
  const [login] = useMutation(LOGIN, {
    onError: handleError
  })

  const handleLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('login')}>login</button>
        {token? <button onClick={handleLogout}>logout</button>: null}
      </div>

      <Authors
        show={page === 'authors'}
        result = {allAuthors}
        editAuthor = {editAuthor}
      />

      <Books
        show={page === 'books'}
        result = {allBooks}
      />

      <NewBook
        show={page === 'add'}
        addBook = {addBook}
      />

      <Login 
        login = {login} 
        setToken = {(token) => setToken(token)}
      />

    </div>
  )
}

export default App;
