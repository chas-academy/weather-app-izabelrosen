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

        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const longitude = JSON.stringify(position.coords.longitude);
                const latitude = JSON.stringify(position.coords.latitude);
                this.setState({ longitude });
                this.setState({ latitude });
                const apiKey = `77c7d99a124f26c235b411cb8645d14b`;
                const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${apiKey}&units=metric`;
              fetch(apiURL)
              .then(res => res.json())
              .then(res => {
                  this.setState({ name: res.name });
                  this.setState({ main: res.main.temp })
                  console.log(res.sys.sunrise);

                                
              });

        });

}

render() {
    return (
        <div>
        <p> Your current location: <br /> { this.state.name } </p>
        <p> { this.state.main } </p>
        </div>
    );
}







}

export default Location;