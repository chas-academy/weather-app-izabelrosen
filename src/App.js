import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { Header, Content, Form, Location, Today, Footer} from './component';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        {/* <div>
          <ul className="header">
            <li><Link to ="/">Home</Link></li>
            <li><Link to ="/search">Search</Link></li> 
            <li><Link to ="/today">Today's Weather</Link></li>
            <li><Link to ="/current">5 days forecast</Link></li> 
          </ul> */}

           <Content> 
            <Route path="/search" component={Form} />
            <Route path="/today" component={Today} />
            <Route path="/current" component={Location} />
            </Content>
          {/* </div> */}
        <Footer />
      </div>
    );
  }
}

export default App;
