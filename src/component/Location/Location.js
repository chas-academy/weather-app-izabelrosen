import React, { Component } from 'react';

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
    if (this.state.forecast.length) {
        console.log(this.state.forecast[0]);
        return (
            this.state.forecast
            .map((day, i) => 
            <ul key={i} id="weather-day"> 
                <ul>
                    <li>{day.dt_txt}</li>
                    <li><img src={`http://openweathermap.org/img/w/${this.state.icon}.png`} /></li>
                    <li>{day.main.temp}°C</li>
                    <li>{day.weather[0].main}</li>
                    <li>{day.main.humidity}%</li>
                    <li>{day.wind.speed}m/s</li>
                    <hr />
                    
                </ul>
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
            <hr />
            
                <p> Your current location: <br /> { this.state.city } </p>
                <img src={`http://openweathermap.org/img/w/${this.state.icon}.png`} />
                <p> Temperature: { this.state.temp }°C </p>
                <p> Humidity: { this.state.humidity } %</p>
                <p> Wind: { this.state.wind } m/h </p>
                <p> Sunrise: { this.state.sunrise } </p>
                <p> Sunset: { this.state.sunset } </p>
                <p> { this.state.dt_txt } </p>

                { this.renderForecast() }
            </div>
        );
    }


}

export default Location;