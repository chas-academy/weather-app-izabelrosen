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
        const apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&APPID=${apiKey}&units=metric&cnt=10`;
        

      // gets data for the current day:
    //   fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&APPID=${apiKey}&units=metric&cnt=7`)
    //   fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${cityname}&APPID=${apiKey}&units=metric&cnt=10`)
        
    fetch(apiURL)
        .then(res => res.json())
        .then(res => {
          this.setState({
            city: res.city.name,
            list: res.list.main,
            temp: res.list[0].main.temp,
            dt_txt: res.list[0].dt_txt,
            humidity: res.list[0].main.humidity,
            wind: res.list[0].wind.speed,
            // sunrise: res.sun.rise
            // sunrise: res.sys.sunrise,
            // sunset: res.sys.sunset
            // weather: res.weather,
            // name: res.name,
            // main: res.main.temp,
            // sunrise: res.sys.sunrise,
            // sunset: res.sys.sunset
            
        }, function() {
            // console.log(res);
            // console.log(res.sys.sunset);
            console.log(res);

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
            <p> { this.state.dt_txt } </p>
            <p> { this.state.city } </p>
            <p> Temperature: { this.state.temp }°C </p>
            <p> Humidity: { this.state.humidity } %</p>
            <p> Wind: { this.state.wind } km/h </p>
            <p> Sunrise: { this.state.sunrise } </p>
            <p> Sunset: { this.state.sunset } </p>
          </div>
        );
      }
    }

  
  export default Form;

