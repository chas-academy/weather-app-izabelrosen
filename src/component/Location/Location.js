import React, { Component } from 'react';

class Location extends Component {
    constructor() {
        super();
        this.state = {
            longitude: 'unkown',
            latitude: 'unknown',
            weather: []
        }
      }

    componentDidMount = () => {

        // Get 10 days weather rapport for your current location. 
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const longitude = JSON.stringify(position.coords.longitude);
                const latitude = JSON.stringify(position.coords.latitude);
                this.setState({ longitude });
                this.setState({ latitude });
                const apiKey = `77c7d99a124f26c235b411cb8645d14b`;
                const apiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&APPID=${apiKey}&units=metric&cnt=10`;
 
                // const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${apiKey}&units=metric`;
              fetch(apiURL)
              .then(res => res.json())
              .then(res => {
                this.setState({
                  city: res.city.name,
                  list: res.list.main,
                  temp: res.list[0].main.temp,
                  dt_txt: res.list[0].dt_txt,
                  humidity: res.list[0].main.humidity,
                  wind: res.list[0].wind.speed
                }, function() {
                    console.log(res);
        
                  })
                });

        });

}

render() {
    return (
        <div>
            <hr />
        <p> Your current location: <br /> { this.state.city } </p>
        <p> Temperature: { this.state.temp }°C </p>
            <p> Humidity: { this.state.humidity } %</p>
            <p> Wind: { this.state.wind } km/h </p>
            <p> Sunrise: { this.state.sunrise } </p>
            <p> Sunset: { this.state.sunset } </p>
            <p> { this.state.dt_txt } </p>
        </div>
    );
}







}

export default Location;