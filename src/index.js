// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();


import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router} from "react-router-dom";
import App from "./App";

render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
