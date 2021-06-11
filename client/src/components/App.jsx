import React from 'react';
import axios from 'axios';
import Atelier from '../Atelier.js';
// import RatingsReview from './RatingsReview.jsx';
import Overview from './overview/Overview.jsx';
import Ratings from './RatingsReview.jsx';
import RICWidget from './RIC-Widget.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: '13023',
      idArr: [
        13027,
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

        {/* <Overview />
        <Ratings id={this.state.product} /> */}

        {this.state.idArr.map((item) => (
          <div key={item} onClick={this.handleItem}>{item}</div>
        ))}
        <div>
          <RICWidget
            productId={this.state.product} />
        </div>

      </div>
    );
  }
};


export default App;