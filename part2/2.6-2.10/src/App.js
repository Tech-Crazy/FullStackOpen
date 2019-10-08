import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const [newNumber, setNumber] = useState('')

  const [filter, setFilter] = useState('')

  const namesToShow = () => persons.filter(person => person.name.toLowerCase()
                                    .includes(filter.toLowerCase()))
                                    .map((person, index) => <p id = {index}>{person.name} {person.number}</p>)
  
  const addNewName = (event) => {
      event.preventDefault()
      const names = persons.map(person => person.name)
      const jointNames = names.join(" ")
      console.log(jointNames)
      if (jointNames.includes(newName)) {
          alert(`${newName} was found in the phonebook`)
      }
      else {
          const newPerson = {
              name: newName,
              number: newNumber
          }
          setPersons(persons.concat(newPerson))
          setNewName('')
          setNumber('')
      }
  }

  const handleNewName = (event) => {
      setNewName(event.target.value)
  }
  const handleNewNumber = (event) => {
      setNumber(event.target.value)
  }
  const handleFilter = (event) => {
      setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input value = {filter} onChange = {handleFilter} />
      </div>
      <form onSubmit = {addNewName}>
        <h2>Add a new</h2>
        <div>
          name: <input value = {newName} onChange = {handleNewName} />
        </div>
        <div>
            phone: <input value = {newNumber} onChange = {handleNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
          <div>
              debug:- name: {newName}, filter {filter}
          </div>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
          {namesToShow()}
      </div>
    </div>
  )
}

export default App