import React from 'react';
import Atelier from '../Atelier.js';

class Star extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      avgScore: 0
    }
  }

  _averageRating() {
    Atelier.getReviewsMeta
  }

  render() {
    return (
      <div>
        <h1>Second Holder</h1>
      </div>
    );
  }
};


export default Star;