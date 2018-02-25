// import React, { Component} from 'react';
// import logo from './logo.svg';

// import './Header.css';

//  class Header extends Component {
//      render() {
//          return (
//              <header className="App-header">
//                  <img src={logo} className="App-logo" alt="logo" />
//                  <h1 className="App-title">Weather</h1>
//              </header>
//          )
//      };
//     }
 
//  export default Header;

import React, { Component} from 'react';

import { Link } from "react-router-dom";
// import { Form } from './component';




const Header = () => (
  <header>
      {/* <h1> Weather </h1> */}
    <nav>
    <div>
          <ul className="header">
            <li><Link to ="/">Home</Link></li>
            <li><Link to ="/search">Search</Link></li> 
            {/* <li><Link to ="/search"><Form /></Link></li>  */}
            <li><Link to ="/today">Today's Weather</Link></li>
            <li><Link to ="/current">5 days forecast</Link></li> 
          </ul>
          </div>
    </nav>
  </header>
);
export default Header;
