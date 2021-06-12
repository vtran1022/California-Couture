import React from 'react';
import axios from 'axios';
import Atelier from '../Atelier.js';
import Overview from './overview/Overview.jsx';
import Ratings from './RatingsReview.jsx';
import RICWidget from './RIC-Widget.jsx';
import AvgRating from './AvgRating.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: '13029',
      idArr: [
        13031,
        13029,
        13024,
        13023
      ]
    }

    this.handleItem = this.handleItem.bind(this);
  }

  handleItem(event) {
    this.setState({ product: event.target.innerText });
  }

  render() {
    return (
      <div>

        <Overview />
        <Ratings id={this.state.product} />
        <RICWidget
          productId={this.state.product} />
      </div>
    );
  }
};


export default App;