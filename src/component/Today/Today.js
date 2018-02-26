import React, { Component } from 'react';

import './Today.css';


class Today extends Component {
    constructor() {
        super();
        this.state = {
            weather: [],
            forecast: []
        }
      }
      

      componentDidMount = () => {

        // Current weather
        navigator.geolocation.getCurrentPosition(
            (position) => {
                
                const longitude = JSON.stringify(position.coords.longitude);
                const latitude = JSON.stringify(position.coords.latitude);
                this.setState({ longitude });
                this.setState({ latitude });
                const apiKey = `77c7d99a124f26c235b411cb8645d14b`;
                const apiURLtoday = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${apiKey}&units=metric`;
                
                fetch(apiURLtoday)
                .then(res => res.json())
                .then(res => {
                  this.setState({
                    weather: res,
                    name: res.name,
                    temp: res.main.temp,
                    sunrise: res.sys.sunrise,
                    sunset: res.sys.sunset,
                    humidity: res.main.humidity,
                    wind: res.wind.speed,
                    
                  }, function() {
          
                    })
                  });
            });

    }

    render() {

        const moment = require('moment');
        const sunrise = moment.unix(this.state.sunrise).utc(Date);
        const sunset = moment.unix(this.state.sunset).utc(Date);

        const celsius = (this.state.temp);
        const fahrenheit = celsius * 9 / 5 + 32;
        const bothTemp = `${celsius}°C is ${fahrenheit}°F`;
        
        return (
            <div>
                <h2>📍</h2>
                <h3>{ this.state.name }</h3>
                <h4> Temperature: <br /> {Math.floor(this.state.temp) }°C </h4>
                <h4> {Math.floor(fahrenheit)}°F </h4>
                <p> Wind: { this.state.wind } m/s </p>
                <p> Humidity: { this.state.humidity } % </p>
                <p> Sunrise: <br />{moment(sunrise).format("HH.mm")} </p>
                <p> Sunset: <br />{moment(sunset).format("HH.mm")} </p>
                
            </div>
        );
    }
}

export default Today;