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
                       console.log(res.wind.speed);
          
                    })
                  });
            });

    }
    renderToday() {
        var moment = require('moment');
    
        if (this.state.weather.length) {
    
            // console.log(this.state.weather[0]);
            
             return (
                 this.state.weather
                 .map((day, i) => 
                 <ul key={i} id="weather-day"> 
                     <li>{moment(day.dt_txt).format("D/MM/YYYY")}</li>
                     <li>{moment(day.dt_txt).format("HH.mm")}</li>
                     <li><img src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`} /></li>
                     <li>Sunrise: {day.sys.sunrise}</li>
                     <li>Sunset: {day.sys.sunset}</li>
              
                 </ul>
             )
    
             )
        } else {
            // return <p>Loading …</p>
        }
        
    }

    render() {

        var moment = require('moment');
        var sunrise = moment.unix(this.state.sunrise).utc(Date);
        var sunset = moment.unix(this.state.sunset).utc(Date);

        const celsius = (this.state.temp);
        const fahrenheit = celsius * 9 / 5 + 32;
        const bothTemp = `${celsius}°C is ${fahrenheit}°F`;
          console.log(bothTemp);

        
        
        return (
            <div>
                <h2>{moment(this.state.dt_txt).format("dddd D/MM")}</h2>
                <h3>{ this.state.name }</h3>
                <h3> Temperature: <br /> { this.state.temp }°C </h3>
                <h3> {fahrenheit}°F </h3>
                <p> Wind: { this.state.wind } m/s </p>
                <p> Humidity: { this.state.wind } % </p>
                <p> Sunrise: <br />{moment(sunrise).format("HH.mm")} </p>
                <p> Sunset: <br />{moment(sunset).format("HH.mm")} </p>
                

                 { this.renderToday() }
                  
            </div>
        );
    }
}

export default Today;