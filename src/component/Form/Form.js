import React, { Component } from 'react';

import './Form.css';


class Form extends Component {
    constructor() {
      super();
      this.state = {
        weather: [],
        forecast: []
      }
    }
  
    onSubmit(e) {
      e.preventDefault();
  

      // Search for a location and get 5 days weather rapport. 

        const cityname = e.nativeEvent.target.elements[0].value;
        const apiKey = `77c7d99a124f26c235b411cb8645d14b`;
        const apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&APPID=${apiKey}&units=metric`;
        //const apiURLday = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&APPID=${apiKey}&units=metric`;

        
        
    fetch(apiURL)
        .then(res => res.json())
        .then(res => {
          this.setState({
            forecast: res.list,
            weather: res.list,
            city: res.city.name,
            list: res.list.main,
            temp: res.list[0].main.temp,
            dt_txt: res.list[0].dt_txt,
            humidity: res.list[0].main.humidity,
            wind: res.list[0].wind.speed,
            description: res.list[0].weather[0].description,
            
        }, function() {
            console.log(res);
            

          })
        });

    }

    renderSearch() {
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
    } 
    // else {
    //     return <p>Search for a location...</p>
    //   }
      
    }

    render() {
      return ( 
        <div className="form--search">
            <form onSubmit={this.onSubmit.bind(this)}>
               <input type="text" placeholder="Search for a location... " name="city" />
               
            </form>
            <h3>{ this.state.city } </h3>

            { this. renderSearch() }

        </div>
      )
    }

}

  
  export default Form;

