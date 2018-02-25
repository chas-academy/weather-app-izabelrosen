import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { Header, Content, Form, Location, Today, Footer} from './component';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
           <Content> 
            <Route path="/search" component={Form} />
            <Route path="/today" component={Today} />
            <Route path="/5-days-forecast" component={Location} />
            </Content>
            
        <Footer />
      </div>
    );
  }
}

export default App;
