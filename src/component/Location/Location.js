import React, { Component } from 'react';

import './Location.css';

class Location extends Component {
    constructor() {
        super();
        this.state = {
            weather: [],
            forecast: []
        }
      }


    componentDidMount = () => {

        // Get 5 days weather rapport for your current location. 
        navigator.geolocation.getCurrentPosition(
            (position) => {
                
                const longitude = JSON.stringify(position.coords.longitude);
                const latitude = JSON.stringify(position.coords.latitude);
                this.setState({ longitude });
                this.setState({ latitude });
                const apiKey = `77c7d99a124f26c235b411cb8645d14b`;
                const apiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&APPID=${apiKey}&units=metric`;
 
              fetch(apiURL)
              .then(res => res.json())
              .then(res => {
                this.setState({
                  city: res.city.name,
                  weather: res.list[0].weather[0].main,
                  list: res.list.main,
                  temp: res.list[0].main.temp,
                  dt_txt: res.list[0].dt_txt,
                  humidity: res.list[0].main.humidity,
                  wind: res.list[0].wind.speed,
                  icon: res.list[0].weather[0].icon,
                  forecast: res.list
                }, function() {
                    // console.log(res);
        
                  })
                });

        });

}


renderForecast() {
    var moment = require('moment');
    if (this.state.forecast.length) {
        console.log(this.state.forecast[0]);
        return (
            this.state.forecast
            .map((day, i) => 
            <ul key={i} id="weather-day"> 
                <li>{moment(day.dt_txt).format("D MMM YYYY")}</li>
                <li><img src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`} /></li>
                <li>{Math.floor(day.main.temp)}°C</li>
                <li>{day.weather[0].main}</li>
                <li>{day.main.humidity}%</li>
                <li>{day.wind.speed}m/s</li>
            </ul>
        )
        )
    } else {
        return <p>Loading …</p>
    }
}

    render() {
        return (
            <div>
                <h3> 5 day forecast for your current location: <br /> { this.state.city } </h3>

                { this.renderForecast() }
            </div>
        );
    }


}

export default Location;