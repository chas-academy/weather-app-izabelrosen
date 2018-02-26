import React, { Component } from 'react';

import './Location.css';

Array.prototype.groupBy = function (prop, endIndex = undefined) {
    
    return this.reduce(function (groups, item) {
        const value = item[prop].substring(0, endIndex);
        
        groups[value] = groups[value] || [];
        groups[value].push(item);
        
        return groups;
    }, []);
}


class Location extends Component {
    constructor() {
        super();
        this.state = {
            weather: [],
            forecast: []
        }
      }


    componentDidMount = () => {

        // Get 5 days forecast for your current location. 
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
                  forecast: res.list,
                  weather: res.sys,
                }, function() {
                    
        
                  })
                });
        });

}


renderForecast() {
    var moment = require('moment');
    
    if (this.state.forecast.length) {
        const groupDays = this.state.forecast.groupBy('dt_txt', 10);
        
        const forecast = Object.keys(groupDays).map(key => groupDays[key]);

         return (
             <ul id="weather--week"> 
             {forecast
             .map((day, i) => 
                <ul key={i} id="weather--day">
                    {day.map((time, i) => 
                        <ul key={i} id="weather--time"> 
                            <li>{moment(time.dt_txt).format("dddd")}</li>
                            <li>{moment(time.dt_txt).format("D/MM")}</li>
                            <li>{moment(time.dt_txt).format("HH.mm")}</li>
                            <li><img src={`http://openweathermap.org/img/w/${time.weather[0].icon}.png`} /></li>
                            <li>{Math.floor(time.main.temp)}°C</li>
                            <li>{time.weather[0].main}</li>
                            <li>{time.main.humidity}%</li>
                            <li>{time.wind.speed}m/s</li>         
                        </ul>
                )}
                </ul>
             )}
            </ul>
            

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