import {Component} from 'react'

import './index.css'

class WeatherApp extends Component {
  state = {city: '', result: ''}

  onChangeSearchInput = event => {
    this.setState({city: event.target.value})
  }

  submitHandler = event => {
    event.preventDefault()

    const {city} = this.state

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d885aa1d783fd13a55050afeef620fcb
`)
      .then(response => response.json())
      .then(data => {
        const kelvin = data.main.temp
        const celcius = kelvin - 273.15
        const total = Math.round(celcius)
        this.setState({result: `Temperature at ${city} ${total}°C`})
      })
      .catch(error => console.log(error))
  }

  render() {
    const {city, result} = this.state

    return (
      <div className="container">
        <div className="card-container">
          <div className="card">
            <h1 className="title">WeatherApp</h1>
            <form onSubmit={this.submitHandler}>
              <input
                type="search"
                placeholder="searchLocation"
                className="input"
                value={city}
                onChange={this.onChangeSearchInput}
              />
              <div className="button-container">
                <button className="button" type="submit">
                  Get Temperature
                </button>
              </div>
            </form>
            <p className="results">{result}</p>
          </div>
        </div>
      </div>
    )
  }
}
export default WeatherApp
