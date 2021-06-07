import React from 'react';
import axios from 'axios';
import Atelier from '../Atelier.js';
import RatingsReview from './RatingsReview.jsx';
import Overview from './overview/Overview.jsx';

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
        <RatingsReview />
        <Overview className='overview' />
      </div>
    );
  }
};


export default App;