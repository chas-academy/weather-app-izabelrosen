import React, { Component} from 'react';

import { Link } from "react-router-dom";

const Header = () => (
  <header>
      <h1> WeatherApp </h1>
    <nav>
    <div>
          <ul className="header">
            <li><Link to ="/">Home</Link></li>
            <li><Link to ="/today">Current weather</Link></li>
            <li><Link to ="/5-days-forecast">5 days forecast</Link></li> 
            <li><Link to ="/search">Search</Link></li> 
          </ul>
          </div>
    </nav>
  </header>
);
export default Header;
