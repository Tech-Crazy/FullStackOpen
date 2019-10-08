import React, { useState, useEffect } from 'react'
import phoneservice from './services/phoneservice'

const App = () => {

  const [ newName, setNewName ] = useState('')

  const [newNumber, setNumber] = useState('')

  const [filter, setFilter] = useState('')

  const [ persons, setPersons] = useState([])

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      phoneservice.remove(person.id)
      .then(message => {
        console.log(`${person.name} deleted with message: `, message)
        const newpersons = persons.filter(element => JSON.stringify(element) !== JSON.stringify(person))
        setPersons(newpersons)
        setNumber('')
        setFilter('')
      })
      .catch(error => console.log(error))
    }
  }

  useEffect(() => {
    phoneservice.getAll()
    .then(phoneall => setPersons(phoneall))
  }, [])

  const namesToShow = () => persons.filter(person => person.name.toLowerCase()
                            .includes(filter.toLowerCase()))
                            .map((person, index) => <p id = {index}>{person.name} {person.number} <button onClick = {() => deletePerson(person)}>delete</button></p>)
  
  const addNewName = (event) => {
      event.preventDefault()
      const names = persons.map(person => person.name)
      const jointNames = names.join(" ")
      if (jointNames.includes(newName)) {
          alert(`${newName} was found in the phonebook`)
      }
      else {
          const newPerson = {
              name: newName,
              number: newNumber
          }
          phoneservice.create(newPerson)
          .then(newphone => {
            setPersons(persons.concat(newphone))
            setNumber('')
            setNewName('')
          })
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