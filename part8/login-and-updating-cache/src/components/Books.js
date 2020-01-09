import React, {useState, useEffect} from 'react'

const Books = (props) => {
  if (!props.show) {
    return null
  }

  const books = props.result.data.allBooks
  const [filterGenre, setFilterGenre] = useState('none')
  const genresList = books.map(book => book.genres).flat(1)
  const genres = []
  for (var genre of genresList) {
    if (!genres.includes(genre)) {
      genres.push(genre)
    }
  }
  let booksToShow
  useEffect(() => {
    if (filterGenre !== 'none') {
      booksToshow = books.filter(book => book.genres.includes(filterGenre))
    }
    else {
      booksToShow = books
    }
  }, [])

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {booksToShow.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {genres.map(genre => <button onClick = {() => setFilterGenre(genre)}>{genre}</button>)}
      <button onClick = {() => setFilterGenre('none')}>all genres</button>
    </div>
  )
}

export default Books