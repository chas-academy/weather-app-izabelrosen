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
        
        
    fetch(apiURL)
        .then(res => res.json())
        .then(res => {
          this.setState({
            city: res.city.name,
            list: res.list.main,
            temp: res.list[0].main.temp,
            dt_txt: res.list[0].dt_txt
            
        }, function() {

            //Gets coordination for current location
            if("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    console.log(position);
                });
            }

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
            <p> { this.state.temp }°C </p>
          </div>
        );
      }
    }

  
  export default Form;

