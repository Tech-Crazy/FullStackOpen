import React, { useState } from 'react'
import Select from 'react-select'

const Authors = (props) => {

  const [option, setOption] = useState(null)
  const [name, setName] = useState('')
  const [year, setYear] = useState('')

  const authors = props.result.data.allAuthors
  if (!props.show || !authors) {
    return null
  }

  const handleSubmit = async event => {
    const newAuthor = await props.editAuthor({
      variables: {
        name: name,
        setBornTo: parseInt(year)
      }
    })
    console.log(newAuthor)
    setYear('')
    setOption(null)
    setName('')
  }

  const handleOptionChange = option => {
    setOption(option)
    setName(option.label)
  }

  const options = authors.map((a, i) => {
    return {
      value: i,
      label: a.name
    }
  })
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <Select 
        onChange = {handleOptionChange}
        value = {option}
        options = {options}
      />
      <label>
        born
        <input type = "text" value = {year} onChange = {event => setYear(event.target.value)} />
      </label>
      <button onClick = {handleSubmit}>Update Author</button>
    </div>
  )
}

export default Authors