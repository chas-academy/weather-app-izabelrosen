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
                    temp: res.main.temp,
                    sunrise: res.sys.sunrise,
                    sunset: res.sys.sunset
                  }, function() {
                       console.log(res);
          
                    })
                  });
            });

    }
    renderToday() {
        var moment = require('moment');
    
        if (this.state.weather.length) {
    
            console.log(this.state.weather[0]);
            
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
            return <p>Loading …</p>
        }
        
    }

    render() {
        var myDate = new Date( this.state.sunrise *1000);
        // document.write(myDate.toGMTString()+"<br>"+myDate.toLocaleString());
        console.log(myDate); //Skriver ut tiden i konsollen men inte på sidan. WHY?!

        var moment = require('moment');
        var sunrise = moment.unix(this.state.sunrise).utc(Date);
        var sunset = moment.unix(this.state.sunset).utc(Date);
        console.log(sunset.Moment);
        
        return (
            <div>
                <h3> Sunrise: <br />{moment(sunrise).format("D/MM/YYYY HH.mm")} </h3>
                
                <h3> Sunset: <br />{moment(sunset).format("D/MM/YYYY HH.mm")} </h3>
                <h3> Temp: <br /> { this.state.temp } </h3>
                

                 { this.renderToday() }
                  
            </div>
        );
    }
}

export default Today;