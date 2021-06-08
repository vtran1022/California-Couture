import React from 'react';
import axios from 'axios';
import Atelier from '../Atelier.js';
import Ratings from './RatingsReview.jsx';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      holder: ''
    }
  }

  render() {
    return (
      <div>
        <h1>Holder</h1>
      </div>
    );
  }
};


export default App;