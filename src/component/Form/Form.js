import React, { Component } from 'react';

class Form extends Component {
    constructor() {
      super();
      this.state = {
        weather: []
      }
    }
  
    onSubmit(e) {
      e.preventDefault();
  
      const cityname = e.nativeEvent.target.elements[0].value;
      const apiKey = `77c7d99a124f26c235b411cb8645d14b`;
      
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&APPID=${apiKey}&units=metric&cnt=7`)
    // fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${cityname}&APPID=${apiKey}&cnt=10`)
        .then(res => res.json())
        .then(res => {
          this.setState({
            weather: res.weather,
            name: res.name,
            main: res.main.temp,
            sunrise: res.sys.sunrise,
            sunset: res.sys.sunset
            
        }, function() {
            console.log(res);
            console.log(res.sys.sunset);
            // console.log(res.forecast.precipitation.unit); Not working yet.
            console.log('Hopefully we have some weather', 
                this.state.weather, 
                this.state.name, 
                this.state.main, 
                this.state.sunrise, 
                this.state.sunset);
          })
        });
    }
  
    render() {
      return (
        <div>
          <form onSubmit={this.onSubmit.bind(this)}>
            <input type="text" placeholder="Type the city name here" name="city" />
            <button type="submit">Get weather</button>
          </form>
          { this.state.weather.length > 0 ? 
            <div className="App-weather">
              <h3>
                  The current weather in {this.state.name}:    
                  </h3>
              <img src={`http://openweathermap.org/img/w/${this.state.weather[0].icon}.png`} title="Title goes here" alt="A weather icon, describing the... weather" />
               <p>{this.state.weather[0].description} </p>
               <p>
                    {this.state.main} degrees Celsius
               </p>

              
            </div>
            : <p>No results yet</p>
          }
        </div>
      );
    }
  }
  
  export default Form;