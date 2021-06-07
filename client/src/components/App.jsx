import React from 'react';
import axios from 'axios';
import Atelier from '../Atelier.js';
<<<<<<< HEAD
import RatingsReview from './RatingsReview.jsx';
=======
import Ratings from './RatingsReview.jsx';
>>>>>>> 000f591ae1906c24f81c7fd0e1422772dd9e41d8

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
      </div>
    );
  }
};


export default App;