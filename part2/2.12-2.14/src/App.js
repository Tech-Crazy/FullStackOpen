import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Description = ({country}) => {
  if (country === undefined) {
    return (
      <>
      </>
    )
  }
  else {
    const languages = () => country.languages.map(language => <li>{language.name}</li>)
    return (
      <div>
        <h1>{country.name}</h1>
        <div>
          <p>Capital {country.capital}</p>
          <p>Population {country.population}</p>
        </div>
        <h2>Languages</h2>
        <ul>
          {languages()}
        </ul>
        <img src = {country.flag} alt= "Country flag" width = "200" height = "200" />
      </div>
    )
  }
}

const WeatherReport = ({country}) => {
  const [weather, setWeather] = useState([])
  useEffect(() => {
    axios.get(`http://api.apixu.com/v1/current.json?key=b8abcb65b47040baa5645224191808&q=${country}`)
    .then(response => {
      console.log(response.data)
      const data = response.data.current
      setWeather([data.temp_c, data.condition.icon, data.wind_kph, data.wind_dir])
    })
  }, [])
  return (
    <div>
      <h2>Weather in {country}</h2>
      <div>
        <strong>temperature: </strong> {weather[0]} celsius
      </div>
      <img src = {weather[1]} alt = "Weather icon" />
      <div>
        <strong>wind: </strong> {weather[2]} kph direction {weather[3]}
      </div>
    </div>
  )
}

const SearchResults = ({countries, filter}) => {
  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
  if (filteredCountries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
  else if (filteredCountries.length === 1) {
    return (
      <div>
        <Description country = {filteredCountries[0]} />
        <WeatherReport country = {filteredCountries[0].name} />
      </div>
    )
  }
  else {
    return (
      <div>
        {filteredCountries.map(country => <p>{country.name} <button>Show</button></p>)}
      </div>
    )
  }
}

const App = () => {

  const [country, setCountry] = useState([])
  const [filter, setFilter] = useState('')
  
  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all")
         .then(response => {
           setCountry(response.data)
         })
  }, [])

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }
  return (
    <div>
      <div>
        find countries <input onChange = {handleFilter} placeholder = "Enter country name..." />
      </div>
      <SearchResults countries = {country} filter = {filter} />
    </div>
  )
}

export default App