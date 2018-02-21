import React, { Component } from 'react';
// import { Header } from './component/Header';
// import { Footer } from './component/Footer/Footer';
import { Header, Content, Form, Location, Footer} from './component';

import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Content> 
            <Form />
            <Location />
        </Content>
        <Footer />
      </div>
    );
  }
}

export default App;
